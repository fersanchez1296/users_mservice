import { redisClient } from "../config/redis_connection.js";

export const enviarCorreo = async (req, res) => {
  if (!redisClient.isOpen) {
    console.error('Redis client is closed');
    await redisClient.connect(); // Reestablece la conexión si está cerrada
  }
  try {
    const correoData = req.correoData;
    const channel = req.channel;
    console.log("middleware", correoData, channel);

    // Asegúrate de que el canal y el mensaje sean cadenas
    if (typeof channel !== "string") {
      throw new TypeError("El canal debe ser una cadena");
    }
    const message = JSON.stringify(correoData);

    // Publicar el mensaje en el canal
    await redisClient.publish(channel, message);

    res.status(200).json({ desc: "Se creó el usuario y se notificó vía Email" });
  } catch (error) {
    console.log("Bandera error");
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
};