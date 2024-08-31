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

router.post("/upload", upload.array("files"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  try {
    const filesURLS = [];

    for (const file of req.files) {
      //Creates a reference to the file location in storage
      const fileLocation = ref(storage, `files/${file.originalname}`);

      //includes info about the file format
      const metadata = {
        contentType: file.mimetype,
      };

      //Uploads the file to its location in storage
      const snapshot = await uploadBytes(
        fileLocation,
        file.buffer, //file.buffer contains the file data.
        metadata
      );

      //Gets the download URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);

      filesURLS.push(downloadURL);
    }

    res.status(201).json({ filesURLS });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(400).send(error.message);
  }
});

export default router;
