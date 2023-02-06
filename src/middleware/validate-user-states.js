const jwt = require('jsonwebtoken')
import { getConnection } from '../database/database';
require('dotenv').config();

// middleware to validate token and active users (rutas protegidas)
const verifyStates = async (req, res, next) => {
    const token = req.header('auth-token');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = verified.user_id
        const connection1 = await getConnection();
        const sql_state = `
            SELECT
                user.id_user,
                user_state.id_state
            FROM
                user
            INNER JOIN user_state ON user.fk_state = user_state.id_state
            WHERE user.id_user = ?
        `
        let query_result = await connection1.query(sql_state, userId);
        if (query_result[0].id_state == process.env.US_ACTIVE_STATE) {
            next();
        } else {
            res.status(401).json({
                tokenError: true,
                message: 'Este usuario no ha sido activado por un administrador del sistema...'
            })
        }
    } catch (error) {
        res.status(401).json({
            tokenError: true,
            message: 'token no es válido'
        })
    }
}
module.exports = verifyStates;