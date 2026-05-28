import multer from "multer";


import fs from "fs"

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let foldername = "uploads/"

    if (file.fieldname === "EventPoster") {
      foldername += "EventPoster"
    } else if (file.fieldname === "EventBanner") {
      foldername += "EventBanner"
    } else if (file.fieldname === "EventSpeaker") {
      foldername += "EventSpeaker"
    } else if (file.fieldname === "EventSpeaker") {
      foldername += "EventSpeaker"
    } else {
      foldername += "others"
    }


    fs.mkdirSync(foldername, { recursive: true })

    cb(null, foldername)



  },

  filname: (req, file, cb) => {
    const UniqueName = `${file.originalname}-${Date.now()}-${file.fieldname}`

    cb(null, UniqueName)

  }

})



const fileFilter = (req, file, cb) => {

  const Allowed = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf"
  ]

  if (Allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("only jpg,jpeg andpng file are allowed",400),false)
  }



}

const upload = multer({

  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }

})

export default upload