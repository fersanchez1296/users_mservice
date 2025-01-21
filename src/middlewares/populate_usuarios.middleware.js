import Usuarios from "../models/usuarios.model.js";
import Areas from "../models/area.model.js";
export const populateUsuarios = async (req, res) => {
  try {
    const POPULATE = await Usuarios.populate(req.usuarios, [
      { path: "Area", select: "Area _id" },
    ]);
    if (!POPULATE) {
      return res.status(500).json({ desc: "Error al procesar los usuarios." });
    }
    return res.status(200).json(POPULATE);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ desc: "Error al formatear los usuarios." });
  }
};
