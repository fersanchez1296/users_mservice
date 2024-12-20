import encryptPassword from "../utils/encrypt_password.utils.js";
import { postRegistrarUsuario, getUsuarios } from "../repository/index.repository.js";

export const register = async (req, res) => {
  const { user } = req.session;
  if (!user) return res.status(403).json({ desc: "Acceso no autorizado" });
  const { password } = req.body;
  const hashedPassword = await encryptPassword(password);
  try {
    const newUsuario = await postRegistrarUsuario(user, hashedPassword);
    if (newUsuario) {
      res.status(200).json({ desc: "Usuario Registrado Correctamente" });
    } else {
      res
        .status(500)
        .json({ desc: "Error al registrar el usuario. Inténtalo más tarde" });
    }
  } catch (error) {
    console.log(error);
  }
};


export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await getUsuarios();
    if(!usuarios){
      return res.status(404).json({desc: "No se encontraron usuarios"});
    }
    req.usuarios = usuarios;
    next()
  } catch (error) {
    return res.status(500).json({desc: "Error interno en el servidor"})
  }
}