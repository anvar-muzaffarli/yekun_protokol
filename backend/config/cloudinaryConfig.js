import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

import dotenv from "dotenv"


dotenv.config({path:"config.env"})

cloudinary.v2.config({
  cloud_name: "derzgbs7x",
  api_key: "755814353247222",
  api_secret: "y8O1t0eQUUYbklvpdMGx5O0nfqs",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "products",
    format: async (req, file) => "jpeg",
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
