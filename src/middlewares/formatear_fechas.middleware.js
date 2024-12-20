import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatearCamposFecha = (req, res, next) => {
  try {
    const data = req.usuarios.map((usuario) => {
      return {
        ...usuario,
        Fecha_creacion: format(
          usuario.Fecha_creacion,
          "d 'de' MMMM 'de' yyyy, h:mm a",
          { locale: es }
        ),
        Fecha_baja: format(
          usuario.Fecha_baja,
          "d 'de' MMMM 'de' yyyy, h:mm a",
          { locale: es }
        ),
      };
    });
    req.usuariosFormateados = data;
    next();
  } catch (error) {
    console.log("Error al formatear los campos");
    return res.send("Error al formatear los campos");
  }
};
