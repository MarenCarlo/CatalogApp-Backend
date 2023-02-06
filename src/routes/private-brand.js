import { Router } from 'express';
import { methods as privateBrandController } from '../controller/private-brand-controller';

const validateAdmin = require('../middleware/validate-administrator');
const validateState = require('../middleware/validate-user-states');

const router = Router();
//Ruta para agregar un nuevo producto
router.post("/brand", validateState, validateAdmin, privateBrandController.addBrand);

//Ruta para editar un producto
router.patch("/brand/:id", validateState, validateAdmin, privateBrandController.editBrand);

//Ruta para eliminar un producto
router.delete("/brand/:id", validateState, validateAdmin, privateBrandController.deleteBrand);


module.exports = router;