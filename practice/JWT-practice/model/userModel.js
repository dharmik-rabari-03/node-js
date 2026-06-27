import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import httpError from "../middlewares/httpError.js";
import JWT from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]

}, {
    timestamps: true
})

UserSchema.pre("save", async function () {
    const user = this

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})

UserSchema.statics.findByCredentials = async function (Email, password) {


    try {
        const user = await this.findOne({ Email })

        if (!user) {
            throw new httpError("unable to login")
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            throw new httpError("unable to login")
        }


        return user
    } catch (error) {
        throw new httpError(error.message)
    }



}

UserSchema.methods.generateAuthToken = async function () {
    try {
        const user = this

        const token = JWT.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        if (!token) {
            throw new httpError("failed to generate token")
        }

        user.tokens = user.tokens.concat({ token })

        await user.save()

        return token

    } catch (error) {

    }
}



const Model = mongoose.model("userSchema", UserSchema)

export default Model