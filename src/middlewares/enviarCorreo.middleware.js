import { redisClient } from "../config/redis_connection.js";

export const enviarCorreo = async (req, res) => {
  if (!redisClient.isOpen) {
    console.error('Redis client is closed');
    await redisClient.connect(); // Reestablece la conexión si está cerrada
  }
  try {
    const correoData = req.correoData;
    const channel = req.channel;

    // Asegúrate de que el canal y el mensaje sean cadenas
    if (typeof channel !== "string") {
      throw new TypeError("El canal debe ser una cadena");
    }
    const message = JSON.stringify(correoData);

    // Publicar el mensaje en el canal
    await redisClient.publish(channel, message);

    return res.status(200).json({ desc: "Se creó el usuario y se notificó vía Email" });
  } catch (error) {
    return res.status(500).json({ desc: "Error al enviar el correo" });
  }
};