import Usuario from "../models/usuarios.model.js";
import ROLES from "../models/roles.model.js";
import AREA from "../models/area.model.js"
import DIRECCION_GENERAL from "../models/direccion_general.model.js";
import COORDINACIONES from "../models/coordinaciones.model.js"
import DEPENDENCIA from "../models/dependencias.model.js"
export const getInfoSelectsCrearUsuario = async () => {
  // Se agrego un gion bajo (_) al final del nombre de las constantes para evitar tener errores
  // con el nombre de los modelos
  try {
    const [
      //DIRECCIONESGENERALES_,
      AREAS_,
      ROLES_,
    ] = await Promise.all([
      AREA.find(),
      ROLES.find(),
    ]);
    return {
      areas: AREAS_,
      roles: ROLES_,
    };
  } catch (error) {
    return false;
  }
};

export const postRegistrarUsuario = async (body, Password) => {
  try {
    console.log("Body que se esta guardando", body);
    const RES = new Usuario({
      ...body,
      Password,
    });
    RES.save();
    return RES;
  } catch (error) {
    console.log("No se esta guardando el usuario");
    return false;
  }
};

export const getUsuarios = async () => {
  try {
    const RES = await Usuario.find({Username : {$ne: "standby"} }).lean();
    return RES;
  } catch (error) {
    return false;
  }
};

export const updateEstadoUsusario = async (estado, userId) => {
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

export const updateUser = async (updatedata, userId) => {
  console.log("Datos a actualizar", updatedata);
  console.log("User id", userId);
  try {
    // Buscar y actualizar al usuario
    const updatedUser = await Usuario.findByIdAndUpdate(
      userId,            // ID del usuario a actualizar
      updatedata,        // Datos a actualizar
      { new: true }      // Retorna el documento actualizado
    );

    // Verifica si se encontró el usuario
    if (!updatedata) {
      return { error: 'Usuario no encontrado' };
    }
    console.log("Usuario actualizado");
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return { error: 'Error al actualizar el usuario' };
  }
};



