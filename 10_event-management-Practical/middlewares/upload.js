import multer from "multer";

import fs from "fs";

const Storage = new multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = "upload/";

    if (file.fieldname === "eventPoster") {
      folderName += "eventPoster";
    } else if (file.fieldname === "eventImages") {
      folderName += "eventImages";
    } else if (file.fieldname === "eventDocument") {
      folderName += "eventDocument";
    } else {
      folderName = "other";
    }

    fs.mkdirSync(folderName, { recursive: true });

    cb(null, folderName);
  },
  filname: (req, file, cb) => {
    const UniqueName = `${file.originalname}-${Date.now()}-${file.fieldname}`;

    cb(null, UniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only jpg,jpeg and png file are allowed", 400), false);
  }
};

const upload = multer({
  storage: Storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;
