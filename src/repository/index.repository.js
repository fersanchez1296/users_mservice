import Usuario from "../models/usuarios.model.js";
import ROLES from "../models/roles.model.js";
import AREA from "../models/area.model.js";
export const getInfoSelectsCrearUsuario = async () => {
  try {
    const [AREAS_, ROLES_] = await Promise.all([AREA.find(), ROLES.find()]);
    return {
      areas: AREAS_,
      roles: ROLES_,
    };
  } catch (error) {
    return false;
  }
};

export const postRegistrarUsuario = async (body, Password, session) => {
  try {
    const result = new Usuario({
      ...body,
      Password,
    });
    const savedUser = await result.save({ session, returnDocument: "after" });
    if (!savedUser) {
      return false;
    }
    return savedUser;
  } catch (error) {
    return false;
  }
};

export const getUsuarios = async (userId) => {
  try {
    const RES = await Usuario.find({
      Username: { $ne: "standby" },
      _id: { $ne: userId },
    }).lean();
    return RES;
  } catch (error) {
    return false;
  }
};

export const updateEstadoUsusario = async (estado, userId) => {
  try {
    const RES = await Usuario.findOneAndUpdate(
      { _id: userId },
      { $set: { isActive: estado } }
    );
    if (RES.modifiedCount === 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUser = async (updatedata, userId, session) => {
  try {
    const updatedUser = await Usuario.findOneAndUpdate(
      { _id: userId },
      { $set: { ...updatedata } },
      { session, returnDocument: "after" }
    );
    if (!updatedUser) {
      return false;
    }
    return updatedUser;
  } catch (error) {
    return false;
  }
};

export const getUsuariosPorAreaModerador = async (userId, areas) => {
  try {
    const result = await Usuario.find({
      Area: { $in: [areas] },
      _id: { $ne: userId },
    }).select("Nombre _id");
    if (!result) {
      return false;
    }
    return result;
  } catch (error) {
    return false;
  }
};

export const getResolutoresPorArea = async (
) => {
  try {
    const areas = await AREA.find();

    const resolutores = await Promise.all(
      areas.map(async (area) => {
        const resolutor = await Usuario.find({
          Area: new ObjectId(area._id),
          isActive: true,
        }).select("Nombre Correo");
        return {
          area: { area: area.Area, _id: area._id },
          resolutores: resolutor,
        };
      })
    );
    return {
      areasResolutores: resolutores,
    };
  } catch (error) {
    return false;
  }
};