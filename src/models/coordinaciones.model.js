import mongoose from "mongoose";

const coordinacionesModel = mongoose.Schema(
    {
      Coordinaciones: {
        type: String,
        trim: true,
        required: true,
      },
    },
    {
      timesStampes: true,
    }
  );
  
  export default mongoose.model("COORDINACIONES", coordinacionesModel, "Coordinaciones");