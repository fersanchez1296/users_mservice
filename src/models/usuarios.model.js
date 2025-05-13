import mongoose, { Schema } from "mongoose";

const ticketResueltosSchema = new Schema({
  a_tiempo: { type: Number, default: 0 },
  fuera_tiempo: { type: Number, default: 0 },
});

const direccion = new Schema({
  Pais: { type: String, trim: true },
  Ciudad: { type: String, trim: true },
  codigoPostal: { type: String, trim: true },
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
    Telefono: {
      type: String,
      trim: true
    },
    Extension: {
      type: String,
      trim: true,
    },
    Puesto: {
      type: String,
      trim: true,
      default: "",
    },
    Ubicacion: {
      type: String,
      trim: true,
      default: "",
    },
    Direccion_General: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DIRECCION_GENERAL",
    },
    Dependecia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DEPENDENCIA",
      default: "679b8a12c9c34d1de358f1cd",
    },
    Direccion: {
      type: direccion,
    },
    Tickets_resueltos: {
      type: ticketResueltosSchema,
      default: () => ({ a_tiempo: 0, fuera_tiempo: 0 }),
    },
  },
  {
    timestamps: true, // Corrección del typo en 'timesStampes'
  }
);

export default mongoose.model("Usuarios", usuarioModel, "Usuarios");
