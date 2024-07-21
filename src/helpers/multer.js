import multer from "multer";
import path from "path";

export const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};

const storage = multer.diskStorage({});

const multerConfig = multer({
  storage,
  fileFilter,
});

export default multerConfig;