import { getConnection } from '../database/database';
const bcrypt = require('bcrypt');

/**
 * Funcion que nos permite validar el hash de contraseña en donde así sea requerido.
 */
const verificationPassword = async (req, res, next) => {
    let { id_User, passUser } = req.body;
    try {
        const connection = await getConnection();
        const sql = `
                SELECT
                    passUser
                FROM
                    user
                WHERE 
                    id_User = ${id_User};
            `
        let result = await connection.query(sql);
        if (result.length <= 0) {
            res.status(401).json({ error: true, message: 'No Se Recibio la Data Necesaria para llevar a cabo esta acción...' });
        } else {
            //validacion de Hash de Password
            const validPassword = await bcrypt.compare(passUser, result[0].passUser);
            if (!validPassword) {
                res.status(401).json({ error: true, message: 'La contraseña es incorrecta...' });
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = verificationPassword;