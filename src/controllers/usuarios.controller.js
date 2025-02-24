import encryptPassword from "../utils/encrypt_password.utils.js";
import {
  postRegistrarUsuario,
  getUsuarios,
  updateEstadoUsusario,
  updateUser,
  getInfoSelectsCrearUsuario,,
  getUsuariosPorAreaModerador,
} from "../repository/index.repository.js";

export const getRoles = async (req, res, next) => {
  try {
    const rolesData = await getInfoSelectRoles();
    if (!rolesData) {
      return res.status(404).json({ desc: "No se encontró información" });
    }
    return res.status(200).json(rolesData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

export const getArea = async (req, res) => {
  try {
    const areaData = await getInfoSelectArea();
    if (!areaData) {
      return res.status(404).json({ desc: "No se encontró información" });
    }
    return res.status(200).json(areaData);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
};

export const getInfoSelectsUsuarios = async (req, res) => {
  try {
    const dataSelects = await getInfoSelectsCrearUsuario();
    if (!dataSelects) {
      return res.status(404).json({ desc: "No se encontró información" });
    }
    return res.status(200).json(dataSelects);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
};

export const register = async (req, res, next) => {
  const session = req.mongoSession;
  try {
    const pass = req.body.Password;
    const hashedPassword = await encryptPassword(pass);
    const newUsuario = await postRegistrarUsuario(
      req.body,
      hashedPassword,
      session
    );
    if (!newUsuario) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ desc: "Error al registrar el usuario. Inténtalo más tarde" });
    }
    const correoData = {
      username: req.body.Username,
      correoDestinatario: req.body.Correo,
      nombreUsuario: req.body.Nombre,
      password: req.body.Password,
    };
    req.correoData = correoData;
    req.channel = "channel_crearUsuario";
    return next();
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const obtenerUsuarios = async (req, res, next) => {
  try {
    const { userId } = req.session.user;
    const usuarios = await getUsuarios(userId);
    if (!usuarios) {
      return res.status(404).json({ desc: "No se encontraron usuarios" });
    }
    req.usuarios = usuarios;
    return next();
  } catch (error) {
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const actualizarestadoUsuario = async (req, res) => {
  const userId = req.params.id;
  const { estado } = req.body;
  try {
    const result = await updateEstadoUsusario(estado, userId);
    if (!result) {
      return res.status(400).json({
        desc: "Ocurrio un error al actualizar el estado del usuario",
      });
    }
    return res
      .status(200)
      .json({ desc: "Estado del usuario actualizado con exito" });
  } catch (error) {
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const actualizarUsuario = async (req, res, next) => {
  const session = req.mongoSession;
  try {
    const userId = req.params.id;
    const updatedata = req.body;
    const result = await updateUser(updatedata, userId, session);
    if (!result) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        desc: "Ocurrio un error al actualizar el usuario",
      });
    }
    return next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const usuariosPorAreaModerador = async (req, res) => {
  try {
    const { userId, areas } = req.session.user;
    console.log(userId, areas);
    const result = await getUsuariosPorAreaModerador(userId, areas);
    console.log("result en el controlador", result);
    if (!result) {
      return res.status(404).json({ desc: "No se encontraron resolutores." });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error en el controlador", result);
    return res.status(500).json({
      desc: "Ocurrio un error al obtener los usuarios. Error interno en el servidor.",
    });
  }
};
