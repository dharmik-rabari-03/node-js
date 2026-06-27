import mongoose from "mongoose";

const ConnectDB = async function () {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI)

        console.log("DB connected")

        return connect

    } catch (error) {
        throw new Error(error.message)
    }

}

export default ConnectDB