import encryptPassword from "../utils/encrypt_password.utils.js";
import { postRegistrarUsuario } from "../repository/index.repository.js";

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