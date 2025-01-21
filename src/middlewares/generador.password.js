import crypto from "crypto";

export const generatePassword = (req, res, next) => {
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ message: "El campo 'Nombre' es obligatorio" });
  }
  const nameBase = Nombre.split(" ")
    .slice(0, 2) // Tomar máximo las primeras dos palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
  const randomNumbers = crypto.randomInt(1000, 9999);
  const generatedPassword = `${nameBase}${randomNumbers}`;
  console.log("body antes de agregar la contraseña",req.body);
  req.body.Password = generatedPassword;
  console.log("body despues de agregar la contraseña",req.body);
  next();
};