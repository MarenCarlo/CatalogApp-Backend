import { Router } from 'express';
import { methods as publicBrandController } from '../controller/public-brand-controller';

const router = Router();
//Listado de Categorias que tienen al menos un productos asignado.
router.get('/brands', publicBrandController.getBrandList);

//Listado de Categorias Completo.
router.get('/brands-list', publicBrandController.getAllBrands);

//Categoria simple obtenida por ID.
router.get("/brands/:id", publicBrandController.getSingleBrand);


module.exports = router;