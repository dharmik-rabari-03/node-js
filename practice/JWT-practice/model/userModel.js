import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const newSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (value.toLowerCase() === "password") {
                throw new Error("password cannot set as a password")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

}
    ,
    {
        timestamps: true
    })




newSchema.pre("save", async function () {
    const user = this

    if (user.isModified("Password")) {
        user.Password = await bcrypt.hash(user.Password, 10)
    }
})

newSchema.statics.findByCredentials = async function (userEmail, Password) {



    const user = await this.findOne({ userEmail })

    if (!user) {
        throw new Error("unable to login")
    }


    const isMatch = await bcrypt.compare(Password, user.Password)

    if (!isMatch) {
        throw new Error("unable to login")
    }

    return user
}

newSchema.methods.generateAuthToken = async function () {

    try {

        const user = this

        const token = JWT.sign(

            { _id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        if (!token) {
            throw new Error("failed to generate")
        }

        user.tokens = user.tokens.concat({ token })

        await user.save()


        return token


    } catch (error) {
        throw new Error(error.message)
    }

}

const user = mongoose.model("userSchema", newSchema)

export default user