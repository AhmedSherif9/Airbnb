import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import placeRouter from "./routes/placeRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import path from "path";
import validateJWT from "./middlewares/validateJWT.js";

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

const uploadsFolderPath = path.join(process.cwd(), "uploads/");
if (!fs.existsSync(uploadsFolderPath)) {
  fs.mkdirSync(uploadsFolderPath, { recursive: true });
}
const upload = multer({ dest: uploadsFolderPath });
app.post(
  "/uploadPhotos",
  validateJWT,
  upload.array("photos", 10),
  (req, res) => {
    const urls = req.files.map((file) => {
      const filePath = path.join(uploadsFolderPath, file.filename);
      const fileData = fs.readFileSync(filePath);
      const dataUrl = `data:${file.mimetype};base64,${fileData.toString(
        "base64"
      )}`;

      fs.unlinkSync(filePath);
      return dataUrl;
    });
    66;
    res.status(200).json({ urls });
  }
);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
