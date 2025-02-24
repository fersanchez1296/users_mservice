import { Router } from "express";
import {
  obtenerUsuarios,
  register,
  actualizarUsuario,
  actualizarestadoUsuario,
  getInfoSelectsUsuarios,
  usuariosPorAreaModerador,
} from "../../controllers/usuarios.controller.js";
import { validateData } from "../../middlewares/validate_data.middleware.js";
import { verifyToken } from "../../middlewares/verify_token.middleware.js";
import { verifyRole } from "../../middlewares/verify_role.middleware.js";
import { verifyUserExists } from "../../middlewares/verify_user_exists.middleware.js";
import { populateUsuarios } from "../../middlewares/populate_usuarios.middleware.js";
import { generatePassword } from "../../middlewares/generador.password.js";
import { generateUsername } from "../../middlewares/generador.username.js";
import { enviarCorreo } from "../../middlewares/enviarCorreo.middleware.js";
import { endTransaction } from "../../middlewares/endTransaction.middleware.js";
import { startTransaction } from "../../middlewares/startTransaction.middleware.js";
import { genericResponse } from "../../middlewares/genericResponse.middleware.js";
const router = Router();

router.post(
  "/users/crear",
  verifyToken,
  verifyRole("Root"),
  // validateData,
  verifyUserExists,
  generateUsername,
  generatePassword,
  startTransaction,
  register,
  endTransaction,
  enviarCorreo
);
router.get(
  "/users",
  verifyToken,
  verifyRole("Root"),
  obtenerUsuarios,
  //formatearCamposFecha,
  populateUsuarios
);

router.put(
  "/users/:id",
  verifyToken,
  verifyRole("Root"),
  actualizarestadoUsuario
);

router.put(
  "/users/editar/:id",
  verifyToken,
  verifyRole("Root"),
  startTransaction,
  actualizarUsuario,
  endTransaction,
  genericResponse
);

router.get(
  "/users/usuarios/roles",
  verifyToken,
  verifyRole("Root"),
  getInfoSelectsUsuarios
);

router.get("/users/usuarios_area",
  verifyToken,
  verifyRole(["Moderador"]),
  usuariosPorAreaModerador,
);
export default router;
