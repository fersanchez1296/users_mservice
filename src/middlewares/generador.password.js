import crypto from "crypto";

export const generatePassword = (req, res, next) => {
  const { Nombre } = req.body;

  if (!Nombre) {
    return res.status(400).json({ message: "El campo 'Nombre' es obligatorio" });
  }

  // Obtener las palabras del nombre
  const words = Nombre.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalizar palabras
    .filter((word) => word.length > 0); // Eliminar posibles palabras vacías

  if (words.length === 0) {
    return res.status(400).json({ message: "El campo 'Nombre' debe contener palabras válidas" });
  }

  // Mezclar las palabras de manera aleatoria
  const shuffledWords = words.sort(() => Math.random() - 0.5);

  // Tomar hasta dos palabras mezcladas y combinarlas
  const nameBase = shuffledWords.slice(0, 2).join("");

  // Generar números aleatorios
  const randomNumbers = crypto.randomInt(10, 99); // Números aleatorios de 2 dígitos

  // Lista de símbolos permitidos
  const symbols = ["-", "#", "$", "_", "*", "!"];
  const randomSymbol = symbols[crypto.randomInt(0, symbols.length)]; // Símbolo aleatorio

  // Crear la contraseña combinando las palabras mezcladas, un número y un símbolo
  const generatedPassword = `${nameBase}${randomNumbers}${randomSymbol}`;

  console.log("body antes de agregar la contraseña", req.body);
  req.body.Password = generatedPassword;
  console.log("body despues de agregar la contraseña", req.body);

  next();
};