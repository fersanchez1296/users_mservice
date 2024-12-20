import { Router } from "express";
import {
  obtenerUsuarios,
  register,
} from "../../controllers/usuarios.controller.js";
import { validateData } from "../../middlewares/validate_data.middleware.js";
import { verifyToken } from "../../middlewares/verify_token.middleware.js";
import { verifyRole } from "../../middlewares/verify_role.middleware.js";
import { verifyUserExists } from "../../middlewares/verify_user_exists.middleware.js";
import { formatearCamposFecha } from "../../middlewares/formatear_fechas.middleware.js";
import { populateUsuarios } from "../../middlewares/populate_usuarios.middleware.js";
const router = Router();

router.post(
  "/users",
  verifyToken,
  verifyRole("Root"),
  verifyUserExists,
  validateData("usuarios"),
  register
);
router.get(
  "/users",
  verifyToken,
  verifyRole("Root"),
  obtenerUsuarios,
  formatearCamposFecha,
  populateUsuarios
);

router.get(
  "/users/:id",
);

router.put(
  "/users/:id",
);
export default router;
