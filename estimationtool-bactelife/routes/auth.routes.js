import { Router } from "express";
import { adminRequired } from "../middlewares/validateToken.js";
import { register, login, logout, getAdmins, deleteAdmin, updateAdmin, verifyToken } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { authSchema, authUpdateSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/login', validateSchema(authSchema), login);
router.post('/register', adminRequired, validateSchema(authSchema), register);
router.post('/logout', adminRequired, logout);
router.get('/admins', adminRequired, getAdmins);
router.put('/update-admin/:id', adminRequired, validateSchema(authUpdateSchema), updateAdmin);
router.delete('/delete-admin/:id', adminRequired, deleteAdmin);
router.get('/verify', verifyToken);

export default router;