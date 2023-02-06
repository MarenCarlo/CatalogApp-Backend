import { Router } from 'express';
import { methods as publicCategoryController } from '../controller/public-category-controller';

const router = Router();
//Listado de Categorias que tienen al menos un productos asignado.
router.get('/categories', publicCategoryController.getCategoryList);

//Listado de Categorias Completo.
router.get('/categories-list', publicCategoryController.getAllCategories);

//Categoria simple obtenida por ID.
router.get("/categories/:id", publicCategoryController.getSingleCategory);


module.exports = router;