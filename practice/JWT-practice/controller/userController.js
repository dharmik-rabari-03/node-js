import Model from "../model/userModel.js"
import httpError from "../middlewares/httpError.js"

const Add = async function (req, res, next) {

    try {

        const { name, Email, password } = req.body

        if (!name || !Email || !password) {
            return new httpError("all Field Are required")
        }

        const newuser = new Model({
            name,
            Email,
            password
        })



        await newuser.save()

        res.status(201).json({ success: true, message: "new user added", newuser })

    } catch (error) {
        throw new httpError(error.message)

    }

}

const getAllUser = async function (req, res, next) {

    try {

        const find = await Model.find()

        if (find.length === 0) {
            return new httpError("no user found")
        }

        res.status(200).json({ message: "user data found", total: find.length, date: find })

    } catch (error) {
        next(new httpError(error.message))
    }

}

const login = async function (req, res, next) {

    try {

        const { Email, password } = req.body

        const user = await Model.findByCredentials(Email, password)

        const token = await user.generateAuthToken()

        res.status(200).json({ success: true, message: "login succesfully", user })

    } catch (error) {
        next(new httpError(error.message))
    }

}

const authLogin = async function (req,res,next) {

    try {

        const user = req.user

        if (!user) {
            throw new httpError("Unable to login", 401)
        }

        res.status(200).json({ success: true, message: "auth login succesfull", user })

    } catch (error) {
        next(new httpError(error.message))

    }

}




export default { Add, getAllUser, login ,authLogin}