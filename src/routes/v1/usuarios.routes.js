import { Router } from "express";
import { register } from "../../controllers/usuarios.controller.js";
import { validateData } from "../../middlewares/validate_data.middleware.js";
import { verifyToken } from "../../middlewares/verify_token.middleware.js";
import { verifyRole } from "../../middlewares/verify_role.middleware.js";
import { verifyUserExists } from "../../middlewares/verify_user_exists.middleware.js";

const router = Router();

router.post(
  "/register",
  verifyToken,
  verifyRole("Root"),
  verifyUserExists,
  validateData("usuarios"),
  register
);
export default router;
