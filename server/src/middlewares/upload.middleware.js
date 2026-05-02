import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    //This runs for every file that is uploaded
    //file.mimeType gives file type of the uploaded file

    const isVideo = file.mimetype.startsWith("video/");

    return {
      folder: "socialapp/posts", //folder in cloudinary where the file will be stored
      resource_type: isVideo ? "video" : "image",
      allowedTypes: ["jpeg", "jpg", "png", "gif", "mp4", "mov"],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); //accept the file
  } else {
    cb(new Error("Unsupported file type"), false); //reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, //50MB file size limit
    files: 5, //limit to 5 files per request
  },
});

export default upload;
