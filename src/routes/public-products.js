import { Router } from 'express';
import { methods as productController } from '../controller/public-products-controller';

const router = Router();
/**
 * Rutas para Productos
 * Listado Completo de Productos (Por defecto ordenado por fecha de ingreso de manera Descendente
 * de esta manera siempre aparecera arriba el último producto agregado, para asi hacer más fácil
 * la tarea de ingresar listados de productos completos).
 */
router.get('/products', productController.getProductsList);

//Producto simple obtenido por ID
router.get("/products/:id", productController.getSingleProduct);

//Productos Obtenidos por su categoria
router.get("/products/category/:id", productController.getProductByCategory);

//Productos Obtenidos por su Marca
router.get("/products/brand/:id", productController.getProductByBrand);

module.exports = router;