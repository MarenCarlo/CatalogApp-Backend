import { getConnection } from '../database/database';

/**
 * POST Product (Agregar un nuevo producto)
 */
const addProduct = async (req, res) => {
    try {
        let { name_product, Price, url_image, fk_Category, fk_Brand } = req.body;
        if (
            (name_product === undefined || name_product === "") || (Price === undefined || Price <= 0) ||
            (url_image === undefined || url_image === "") || (fk_Category === undefined || fk_Category <= 0) ||
            (fk_Brand === undefined || fk_Brand <= 0)
        ) {
            res.status(400).json({
                error: true,
                message: "Todos los campos deben ser llenados!"
            });
        } else {
            const connection = await getConnection();
            const sql = `
                INSERT INTO product 
                    (name_product, Price, url_image, added_date, fk_Category, fk_Brand) 
                VALUES 
                    ('${name_product}', '${Price}', '${url_image}', NOW(), '${fk_Category}','${fk_Brand}');
            `
            await connection.query(sql);
            res.json({
                error: false,
                message: "Producto Agregado..."
            });
        }

    } catch (error) {
        res.status(500).json(error.message);
    }
};

/**
 * PATCH Product (Editar un producto)
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let { name_product, Price, url_image, added_date, fk_Category, fk_Brand } = req.body;
        if (
            (name_product === undefined || name_product === "") || (Price === undefined || Price <= 0) ||
            (url_image === undefined || url_image === "") || (fk_Category === undefined || fk_Category <= 0) ||
            (fk_Brand === undefined || fk_Brand <= 0)
        ) {
            res.status(400).json({ message: "Todos los campos deben ser llenados!" });
        } else {
            if (id === undefined || id <= 0) {
                res.status(400).json({
                    error: true,
                    message: "No se recibio el identificador para el producto a editar..."
                });
            } else {
                const sql = `
                    UPDATE product
                    SET 
                        name_product = '${name_product}',
                        price = '${Price}',
                        url_image = '${url_image}',
                        added_date = '${added_date}',
                        fk_Category = '${fk_Category}',
                        fk_Brand = '${fk_Brand}'
                    WHERE id_Product = ?;
                    `
                const connection = await getConnection();
                await connection.query(sql, id);
                res.json({
                    error: false,
                    message: "Producto Editado..."
                });
            }
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

/**
 * DELETE Product (Editar un producto)
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === undefined || id <= 0) {
            res.status(400).json({
                error: true,
                message: "No se recibio el identificador para el producto a eliminar..."
            });
        } else {
            const connection = await getConnection();
            await connection.query("DELETE FROM product WHERE id_Product = ?", id);
            res.status(200).json({
                error: false,
                message: "Producto Eliminado Exitosamente..."
            });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};


export const methods = {
    addProduct,
    updateProduct,
    deleteProduct
}