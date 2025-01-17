import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import placeRouter from "./routes/placeRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import filesRouter from "./routes/filesRoute.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));

app.use("/user", userRouter);
app.use("/places", placeRouter);
app.use("/bookings", bookingRouter);
app.use("/files", filesRouter);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
