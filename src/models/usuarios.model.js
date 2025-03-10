import mongoose, { Schema } from "mongoose";

const ticketResueltosSchema = new Schema({
  a_tiempo: { type: Number },
  fuera_tiempo: { type: Number },
});

const usuarioModel = mongoose.Schema(
  {
    Username: {
      type: String,
      trim: true,
      required: true,
    },
    Password: {
      type: String,
      trim: true,
      required: true,
    },
    Nombre: {
      type: String,
      trim: true,
      required: true,
    },
    Rol: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "ROLES",
    },
    Area: {
      type: [mongoose.Schema.Types.ObjectId],
      trim: true,
      ref: "Area",
    },
    Correo: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: true,
    },
    Tickets_resueltos: {
      type: ticketResueltosSchema,
      default: 0,
    },
  },
  {
    timesStampes: true,
  }
);

export default mongoose.model("Usuarios", usuarioModel, "Usuarios");
