import usuariosSchema from "../schemas/usuarios.schema.js";

export const validateData = (req, res, next) => {
  console.log(req.body);
  delete req.body._id;
  delete req.body.Username;
  delete req.body.Password;
  delete req.body.__v;
  delete req.body.id;
  delete req.body.areaUsuario;
  delete req.body.usernameUsuario;
  delete req.body.correoUsuario;
  delete req.body.direcciongeneralUsuario;
  console.log("Datos en validate data", req.body);
  const { error } = usuariosSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.details?.[0]?.message || "Error de validacion" });
  }
  next();
};
