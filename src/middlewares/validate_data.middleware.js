import usuariosSchema from "../schemas/usuarios.schema.js";

export const validateData = (req, res, next) => {
  delete req.body._id;
  delete req.body.Username;
  delete req.body.Password;
  delete req.body.__v;
  delete req.body.id;
  delete req.body.areaUsuario;
  delete req.body.usernameUsuario;
  delete req.body.correoUsuario;
  delete req.body.direcciongeneralUsuario;
  const { error } = usuariosSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ desc:"Error de validacion" });
  }
  next();
};
