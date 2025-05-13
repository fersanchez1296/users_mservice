import Usuarios from "../models/usuarios.model.js";
export const populateUsuarios = async (req, res) => {
  try {
    const POPULATE = await Usuarios.populate(req.usuarios, [
      { path: "Area" },
      { path: "Rol" },
      { path: "Direccion_General" },
    ]);
    if (!POPULATE) {
      return res.status(500).json({ desc: "Error al procesar los usuarios." });
    }
    return res.status(200).json(POPULATE);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ desc: "Error interno en el servidor" });
  }
};
