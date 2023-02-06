import { getConnection } from '../database/database';
/**
 * GET Products List
 */
const getProductsList = async (req, res) => {
    try {
        var ip = req.socket.remoteAddress;
        console.info(ip);
        const connection = await getConnection();
        const sql = `
            SELECT
                product.id_Product,
                product.name_product,
                product.url_image,
                product.price,
                category.id_Category,
                category.category_Name,
                brand.id_Brand,
                brand.brand_Name
            FROM
                product
            INNER JOIN category ON product.fk_Category = category.id_Category
            INNER JOIN brand ON product.fk_Brand = brand.id_Brand
            ORDER BY
                added_date
            DESC;
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
 * GET Product by ID (Obtener un solo producto en base a su ID)
 */
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const sql = `
            SELECT
                product.id_Product,
                product.name_product,
                product.url_image,
                product.price,
                category.id_Category,
                category.category_Name,
                brand.id_Brand,
                brand.brand_Name
            FROM
                product
            INNER JOIN category ON product.fk_Category = category.id_Category
            INNER JOIN brand ON product.fk_Brand = brand.id_Brand
            WHERE
                id_Product = ?
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

/**
 * GET Product by category
 */
const getProductByCategory = async (req, res) => {
    try {
        var ip = req.socket.remoteAddress;
        console.info(ip);
        const connection = await getConnection();
        const { id } = req.params;
        const sql = `
            SELECT
                product.id_Product,
                product.name_product,
                product.url_image,
                product.price,
                category.id_Category,
                category.category_Name,
                brand.id_Brand,
                brand.brand_Name
            FROM
                product
            INNER JOIN category ON product.fk_Category = category.id_Category
            INNER JOIN brand ON product.fk_Brand = brand.id_Brand
            WHERE
                fk_Category = ?
            ORDER BY
                added_date
            DESC
        `
        let result = await connection.query(sql, id);
        res.status(200).json({
            error: false,
            result
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

/**
 * GET Product by brand
 */
const getProductByBrand = async (req, res) => {
    try {
        var ip = req.socket.remoteAddress;
        console.info(ip);
        const connection = await getConnection();
        const { id } = req.params;
        const sql = `
            SELECT
                product.id_Product,
                product.name_product,
                product.url_image,
                product.price,
                category.id_Category,
                category.category_Name,
                brand.id_Brand,
                brand.brand_Name
            FROM
                product
            INNER JOIN category ON product.fk_Category = category.id_Category
            INNER JOIN brand ON product.fk_Brand = brand.id_Brand
            WHERE
                fk_Brand = ?
            ORDER BY
                added_date
            DESC
        `
        let result = await connection.query(sql, id);
        res.status(200).json({
            error: false,
            result
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const methods = {
    getProductsList,
    getSingleProduct,
    getProductByCategory,
    getProductByBrand
}