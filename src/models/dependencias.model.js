import mongoose from "mongoose";

const dependenciasModel = mongoose.Schema(
    {
      Dependencias: {
        type: String,
        trim: true,
        required: true,
      },
    },
    {
      timesStampes: true,
    }
  );
  
  export default mongoose.model("DEPENDENCIAS", dependenciasModel, "Dependencias");