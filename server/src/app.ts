import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import session from "express-session";
import routes from "./routes/index.js";

const app: Application = express();

app.use(
  cors({
    origin: `http://localhost:${process.env.CORS_PORT}`, 
    credentials: true, 
  })
);

app.use(express.json());

app.use(
  session({
    secret:
      process.env.SECRET_KEY ||
      (() => {
        throw new Error("Missing environment variable: SECRET_KEY");
      })(),
    resave: false,
    saveUninitialized: false,
    name: 'session_id',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure to true for HTTPS
    },
  })
);

app.use(routes);

export default app;
