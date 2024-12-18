import Joi from "joi";
const usuariosSchema = Joi.object({
  Username: Joi.string().alphanum().required(),
  Password: Joi.string().required(),
  Nombre: Joi.string().required(),
  Rol: Joi.string().required(),
  Area: Joi.string().alphanum().required(),
  Coordinacion: Joi.string().alphanum().required(),
  isActive: Joi.boolean().required(),
  Dependencia: Joi.string().alphanum().required(),
  Direccion_general: Joi.string().alphanum().required(),
});

export default usuariosSchema;
