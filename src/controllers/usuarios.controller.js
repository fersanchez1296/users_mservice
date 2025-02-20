import encryptPassword from "../utils/encrypt_password.utils.js";
import {
  postRegistrarUsuario,
  getUsuarios,
  updateEstadoUsusario,
  updateUser,
  getInfoSelectsCrearUsuario,
  getUsuariosPorAreaModerador,
} from "../repository/index.repository.js";

export const getRoles = async (req, res, next) => {
  try {
    const rolesData = await getInfoSelectRoles();
    console.log(rolesData);
    if (!rolesData) {
      return res.status(404).json({ desc: "No se encontró información" });
    }
    return res.status(200).json(rolesData);
    next();
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export const getArea = async (req, res) => {
  try {
    const areaData = await getInfoSelectArea();
    console.log(areaData);
    if (!areaData) {
      return res.status(404).json({ desc: "No se encontró información" });
    }
    return res.status(200).json(areaData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export const getInfoSelectsUsuarios = async (req, res) => {
  try {
    const dataSelects = await getInfoSelectsCrearUsuario();
    console.log("datos de los selects", dataSelects);
    if (!dataSelects) {
      return res.status(404).json({ desc: "No se encontró información" });
    }
    return res.status(200).json(dataSelects);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export const register = async (req, res, next) => {
  const { user } = req.session;
  if (!user) return res.status(403).json({ desc: "Acceso no autorizado" });
  const pass = req.body.Password;
  const hashedPassword = await encryptPassword(pass);
  try {
    const newUsuario = await postRegistrarUsuario(req.body, hashedPassword);
    if (!newUsuario) {
      return res
        .status(500)
        .json({ desc: "Error al registrar el usuario. Inténtalo más tarde" });
    }
    const correoData = {
      username: req.body.Username,
      correoDestinatario: req.body.Correo,
      //correoRemitente: user.correo,
      nombreUsuario: req.body.Nombre,
      password: req.body.Password,
    };
    console.log("Correo Data", correoData);
    req.correoData = correoData;
    req.channel = "channel_crearUsuario";
    console.log("Se guardo el usuario");
    next();
  } catch (error) {
    console.error("Error al crear el usuario", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await getUsuarios();
    // console.log(usuarios);
    if (!usuarios) {
      return res.status(404).json({ desc: "No se encontraron usuarios" });
    }
    req.usuarios = usuarios;
    next();
  } catch (error) {
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};

export const actualizarestadoUsuario = async (req, res) => {
  const userId = req.params.id;
  const { estado } = req.body;
  console.log("Parametros en el controlador =>", userId, estado);
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

export const actualizarUsuario = async (req, res) => {
  const userId = req.params.id;
  const updatedata = req.body;
  console.log("Datos en la funcion actulizar usuario");
  console.log("Datos a actualizar", updatedata);
  console.log("User id", userId);
  console.log("-------------------------------------------");
  //console.log("Parametros en el controlador =>", userId, updatedata);
  try {
    const result = await updateUser(updatedata, userId);
    if (!result) {
      console.log("No se pudo actualizar", updatedata);
      return res.status(400).json({
        desc: "Ocurrio un error al actualizar el usuario",
      });
    }
    return res.status(200).json({ desc: "Usuario actualizado con exito" });
  } catch (error) {
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
