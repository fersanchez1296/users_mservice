import Usuarios from "../models/usuarios.model.js";

export const verifyUserExists = async (req, res, next) => {
  const { Correo } = req.body;
  try {
    const result = await Usuarios.find({ Correo });
    if (result.length > 0) {
      return res.status(409).json({ desc: "El correo ya se registro para otro usuario" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ desc: "Error del servidor" });
  }
};