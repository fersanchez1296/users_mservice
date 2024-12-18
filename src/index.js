import connectDB from "./db/db_connection.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import usuariosRoutes from "./routes/v1/usuarios.routes.js"

morgan.token("date", function () {
  return new Date().toISOString();
});
const format =
  "[:date] :method :url :status :response-time ms - :res[content-length]";
const app = express();
app.use(
  cors({
    origin: "http://localhost:4000", //API Gateway
    //origin: "*",
    credentials: true,
  })
);
app.use(morgan(format));
app.use(express.json());
app.use(cookieParser());
app.use(usuariosRoutes);

connectDB();

if(app.listen(process.env.PORT)){
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
}
