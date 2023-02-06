import { getConnection } from '../database/database';
/**
 * GET Categories List
 * 
 * Este Listado de Marcas se extrae desde la tabla de productos
 * para evitar traer las Marcas que no tienen productos asignados
 * pero que si existen en la Base de Datos
 * 
 */
const getBrandList = async (req, res) => {
    try {
        var ip = req.socket.remoteAddress;
        console.info(ip);
        const connection = await getConnection();
        const sql = `
            SELECT DISTINCT
                brand.id_Brand,
                brand.brand_Name
            FROM
                product
            INNER JOIN brand ON product.fk_Brand = brand.id_Brand
            ORDER BY
                brand.brand_Name ASC;
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
const getAllBrands = async (req, res) => {
    try {
        const connection = await getConnection();
        const sql = `SELECT * FROM brand ORDER BY brand_Name ASC;`
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
const getSingleBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sql = `
            SELECT
                id_Brand,
                brand_Name
            FROM
                brand
            WHERE id_Brand = ?;
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
    getBrandList,
    getAllBrands,
    getSingleBrand
}