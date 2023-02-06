import { getConnection } from '../database/database';

/**
 * POST Category (Agregar una nueva categoria)
 */
const addCategory = async (req, res) => {
    try {
        let { category_Name } = req.body;
        if ((category_Name === undefined || category_Name === "")) {
            res.status(400).json({
                error: true,
                message: "Todos los campos deben ser llenados!"
            });
        } else {
            const connection = await getConnection();
            const verifyCategorySql = `SELECT * FROM category WHERE category_Name = ?;`
            let result = await connection.query(verifyCategorySql, category_Name)
            if (result.length <= 0) {
                const sql = `
                    INSERT INTO category 
                        (category_Name) 
                    VALUES 
                        ('${category_Name}');
                `
                await connection.query(sql);
                res.status(200).json({
                    error: false,
                    message: "Categoría Agregada Exitosamente..."
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: 'Esta Categoria ya existe...'
                });
            }
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

/**
 * PATCH Category (Editar una categoría)
 */
const editCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let { category_Name } = req.body;
        if ((category_Name === undefined || category_Name === "")) {
            res.status(400).json({
                error: true,
                message: "Todos los campos deben ser llenados!"
            });
        } else {
            const connection = await getConnection();
            const verifyCategorySql = `SELECT * FROM category WHERE category_Name = ?;`
            let result = await connection.query(verifyCategorySql, category_Name)
            if (result.length <= 0) {
                const sql = `
                    UPDATE category
                    SET 
                        category_Name = '${category_Name}'
                    WHERE id_Category = '${id}';
                `
                await connection.query(sql);
                res.status(200).json({
                    error: false,
                    message: "Categoría Editada Exitosamente..."
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
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === undefined || id <= 0) {
            res.status(400).json({
                error: true,
                message: "No se recibio el identificador para la categoria a eliminar..."
            });
        } else {
            const connection = await getConnection();
            await connection.query("DELETE FROM category WHERE id_Category = ?", id);
            res.status(200).json({
                error: false,
                message: "Categoria Eliminada Exitosamente..."
            });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const methods = {
    addCategory,
    editCategory,
    deleteCategory
}