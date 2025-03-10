import crypto from "crypto";

export const generatePassword = (req, res, next) => {
  try {
    const { Nombre } = req.body;

    if (!Nombre) {
      return res
        .status(400)
        .json({ desc: "El campo 'Nombre' es obligatorio" });
    }

    const normalizedNombre = Nombre.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/Ñ/g, "N");
    const words = normalizedNombre
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .filter((word) => word.length > 0); // Eliminar posibles palabras vacías

    if (words.length === 0) {
      return res
        .status(400)
        .json({ desc: "El campo 'Nombre' debe contener palabras válidas" });
    }

    const shuffledWords = words.sort(() => Math.random() - 0.5);
    const nameBase = shuffledWords.slice(0, 2).join("");
    const randomNumbers = crypto.randomInt(10, 99);
    const symbols = ["-", "#", "$", "_", "*", "!"];
    const randomSymbol = symbols[crypto.randomInt(0, symbols.length)];
    const generatedPassword = `${nameBase}${randomNumbers}${randomSymbol}`;
    req.body.Password = generatedPassword;
    return next();
  } catch (error) {
    return res.status(500).json({
      desc: "Error interno en el servidor",
    });
  }
};