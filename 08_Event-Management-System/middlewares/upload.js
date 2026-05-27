import multer from "multer";

import path from "path";

import HttpError from "./HttpError";

const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    const EventPoster = req.file?.req.files.map((file) => file.path) || null;
    const EventBanner = req.file?.req.files[0].path || null;
    const EventSpeaker = req.file?.req.files.map((file) => file.path) || null;
  },
});
