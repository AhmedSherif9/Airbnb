import express from "express";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import multer from "multer";
import firebaseConfig from "../config/firebase.config.js";

const router = express.Router();

// The Firebase app configured in your firebaseConfig
const app = initializeApp(firebaseConfig);

//Get the storage instance from the app
const storage = getStorage(app);

// multer.memoryStorage() stores the uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    //Creates a reference to the file location in storage
    const fileLocation = ref(storage, `files/${req.file.originalname}`);

    //includes info about the file format
    const metadata = {
      contentType: req.file.mimetype,
    };

    //Uploads the file to its location in storage
    const snapshot = await uploadBytes(
      fileLocation,
      req.file.buffer, //req.file.buffer contains the file data.
      metadata
    );

    //Gets the download URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);

    res.status(201).json({
      message: "File uploaded to Firebase Storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(400).send(error.message);
  }
});

export default router;
