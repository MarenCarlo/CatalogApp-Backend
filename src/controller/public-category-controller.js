import { getConnection } from '../database/database';
/**
 * GET Categories List
 * 
 * Este Listado de categorias se extrae desde la tabla de productos
 * para evitar traer las categorias que no tienen productos asignados
 * pero que si existen en la Base de Datos
 * 
 */
const getCategoryList = async (req, res) => {
    try {
        var ip = req.socket.remoteAddress;
        console.info(ip);
        const connection = await getConnection();
        const sql = `
            SELECT DISTINCT
                category.id_Category,
                category.category_Name
            FROM
                product
            INNER JOIN category ON product.fk_Category = category.id_Category
            ORDER BY
                category.category_Name ASC;
        `
        let result = await connection.query(sql);
        res.status(200).json({
            error: false,
            result
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

/**
 * GET getAllCategories
 * 
 * Este se utiliza para la data de Selects Inputs desde el Frontend
 */
const getAllCategories = async (req, res) => {
    try {
        const connection = await getConnection();
        const sql = `SELECT * FROM category ORDER BY category_Name ASC;`
        const result = await connection.query(sql);
        res.status(200).json({
            error: false,
            result
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

/**
 * GET Product by ID (Obtener un solo producto en base a su ID)
 */
const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sql = `
            SELECT
                id_Category,
                category_Name
            FROM
                category
            WHERE id_Category = ?;
        `
        const result = await connection.query(sql, id);
        res.status(200).json({
            error: false,
            result
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const methods = {
    getCategoryList,
    getAllCategories,
    getSingleCategory
}