import connectDB from "./db/db_connection.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import usuariosRoutes from "./routes/v1/usuarios.routes.js";

morgan.token("date", function () {
  return new Date().toISOString();
});
const format =
  "[:date] :method :url :status :response-time ms - :res[content-length]";
const app = express();
app.use(
  cors({
    origin: [
      `http://${process.env.APIGATEWAY_SERVICE_HOST}:${process.env.APIGATEWAY_SERVICE_PORT}`,
      "http://localhost:3000",
    ], //API Gateway
    //origin: "*",
    credentials: true,
  })
);
app.use(morgan(format));
app.use(express.json());
app.use(cookieParser());
app.use(usuariosRoutes);

connectDB();

if (app.listen(process.env.USERS_SERVICE_PORT)) {
  console.log(`Servidor corriendo en el puerto ${process.env.USERS_SERVICE_PORT}`);
}
