import mongoose from "mongoose";

const packageModel = new mongoose.Schema({


    packageName: {
        type: String,
        required: true,
        trim: true
    },
    packagePrice: {
        type: Number,
        required: true,

    },
    location: {
        typeof: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    images: {
        type: String
    }



})

const package = mongoose.model("package", packageModel)

export default package;