import { Router } from 'express';
import { methods as privateCategoryController } from '../controller/private-category-controller';

const validateAdmin = require('../middleware/validate-administrator');
const validateState = require('../middleware/validate-user-states');

const router = Router();
//Ruta para agregar un nuevo producto
router.post("/category", validateState, validateAdmin, privateCategoryController.addCategory);

//Ruta para editar un producto
router.patch("/category/:id", validateState, validateAdmin, privateCategoryController.editCategory);

//Ruta para eliminar un producto
router.delete("/category/:id", validateState, validateAdmin, privateCategoryController.deleteCategory);


module.exports = router;