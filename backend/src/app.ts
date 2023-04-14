import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import FileRoute from "./routes/file";
import { Request, Response } from "express";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", FileRoute);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  console.error(err);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

export default app;
