export const genericResponse = async (req, res) => {
    res
      .status(201)
      .json({
        desc: "El usuario fué modificado con éxito.",
      });
  };
  