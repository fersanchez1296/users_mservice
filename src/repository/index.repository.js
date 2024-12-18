import Usuario from "../models/usuarios.model.js";
export const postRegistrarUsuario = async (body, Password) => {
  try {
    const RES = new Usuario({
      ...body,
      password: Password,
    });
    RES.save();
    return RES;
  } catch (error) {
    return false;
  }
};