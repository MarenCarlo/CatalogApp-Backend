import { Router } from 'express';
import { methods as productController } from '../controller/private-products-controller';

const validateAdmin = require('../middleware/validate-administrator');
const validateState = require('../middleware/validate-user-states');
const verificatePassword = require('../middleware/verificationPassword');

const router = Router();
//Ruta para agregar un nuevo producto
router.post("/product", validateState, validateAdmin, productController.addProduct);

//Ruta para editar un producto
router.patch("/product/:id", validateState, validateAdmin, productController.updateProduct);

//Ruta para eliminar un producto
router.delete("/product/:id", validateState, validateAdmin, verificatePassword, productController.deleteProduct);


module.exports = router;