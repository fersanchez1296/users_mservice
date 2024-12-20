import mongoose from "mongoose";

const areaModel = mongoose.Schema(
    {
      Area: {
        type: String,
        trim: true,
        required: true,
      },
    },
    {
      timesStampes: true,
    }
  );
  
  export default mongoose.model("Area", areaModel, "Area");