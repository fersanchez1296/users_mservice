import * as Schemas from "../schemas/usuarios.schema.js";

export const validateData = (schemaName) => {
  return (req, res, next) => {
    const schema = Schemas[`${schemaName}Schema`];
    if (!schema) {
      return res.status(400).json({ error: "Nombre de Esquema inválido" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details?.[0]?.message || "Error de validacion" });
    }
    next();
  };
};
