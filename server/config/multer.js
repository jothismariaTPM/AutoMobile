import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure folders exist
const productDir = "uploads/products";
const videoDir = "uploads/videos";

if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "images") {
      cb(null, productDir);
    } else if (file.fieldname === "testingVideo") {
      cb(null, videoDir);
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

export default upload;
