import { getConnection } from '../database/database';

/**
 * POST Category (Agregar una nueva categoria)
 */
const addBrand = async (req, res) => {
    try {
        let { brand_Name } = req.body;
        if ((brand_Name === undefined || brand_Name === "")) {
            res.status(400).json({
                error: true,
                message: "Todos los campos deben ser llenados!"
            });
        } else {
            const connection = await getConnection();
            const verifyCategorySql = `SELECT * FROM brand WHERE brand_Name = ?;`
            let result = await connection.query(verifyCategorySql, brand_Name)
            if (result.length <= 0) {
                const sql = `
                    INSERT INTO brand 
                        (brand_Name) 
                    VALUES 
                        ('${brand_Name}');
                `
                await connection.query(sql);
                res.status(200).json({
                    error: false,
                    message: "Marca Agregada Exitosamente..."
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: 'Esta Marca ya existe...'
                });
            }
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

/**
 * PATCH Brand (Editar una Marca)
 */
const editBrand = async (req, res) => {
    try {
        let { id } = req.params;
        let { brand_Name } = req.body;
        if ((brand_Name === undefined || brand_Name === "")) {
            res.status(400).json({
                error: true,
                message: "Todos los campos deben ser llenados!"
            });
        } else {
            const connection = await getConnection();
            const verifyCategorySql = `SELECT * FROM brand WHERE brand_Name = ?;`
            let result = await connection.query(verifyCategorySql, brand_Name)
            if (result.length <= 0) {
                const sql = `
                    UPDATE brand
                    SET 
                        brand_Name = '${brand_Name}'
                    WHERE id_Brand = '${id}';
                `
                await connection.query(sql);
                res.status(200).json({
                    error: false,
                    message: "Marca Editada Exitosamente..."
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: 'No se puede editar al mismo valor...'
                });
            }
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

/**
 * DELETE Category (Eliminar una Categoría)
 */
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === undefined || id <= 0) {
            res.status(400).json({
                error: true,
                message: "No se recibio el identificador para la marca a eliminar..."
            });
        } else {
            const connection = await getConnection();
            await connection.query("DELETE FROM brand WHERE id_Brand = ?", id);
            res.status(200).json({
                error: false,
                message: "Marca Eliminada Exitosamente..."
            });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const methods = {
    addBrand,
    editBrand,
    deleteBrand
}