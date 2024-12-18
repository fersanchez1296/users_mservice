import Usuarios from "../models/usuarios.model.js";

export const verifyUserExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const result = await Usuarios.find({
      username: username,
    });
    if (result.length === 0) {
      next();
    } else {
      return res.status(409).json({ desc: "El usuario ya existe" });
    }
  } catch (error) {
    console.log(error);
  }
};
