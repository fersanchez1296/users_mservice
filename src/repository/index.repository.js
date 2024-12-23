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

export const getUsuarios = async () => {
  try {
    const RES = await Usuario.find().lean();
    return RES;
  } catch (error) {
    return false;
  }
};

export const updateUsusario = async (estado, userId) => {
  console.log("Parametros en el repositorio =>", userId, estado);
  try {
    const RES = await Usuario.findOneAndUpdate(
      { _id: userId },
      { $set: { isActive: estado } }
    );
    console.log(RES);
    if (RES.modifiedCount === 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
