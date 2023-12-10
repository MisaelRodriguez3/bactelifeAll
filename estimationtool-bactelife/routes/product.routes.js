import { Router } from "express";
import { adminRequired } from "../middlewares/validateToken.js";
import { addProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createProductSchema, updateProductSchema } from "../schemas/products.schema.js";

const router = Router();

router.post('/product', adminRequired, validateSchema(createProductSchema), addProduct);
router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.delete('/delete-product/:id', adminRequired, deleteProduct);
router.put('/update-product/:id', adminRequired, validateSchema(updateProductSchema), updateProduct);

export default router;