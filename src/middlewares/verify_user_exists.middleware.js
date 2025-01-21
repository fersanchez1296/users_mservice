import Usuarios from "../models/usuarios.model.js";

export const verifyUserExists = async (req, res, next) => {
  const {Correo}  = req.body;
  try {
    const result = await Usuarios.find({
      correo: Correo,
    });
    if (result) {
      next();
    } else {
      return res.status(409).json({ desc: "El usuario ya existe" });
    }
  } catch (error) {
    console.log(error);
  }
};
