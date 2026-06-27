import Model from "../model/userModel.js"
import httpError from "../middlewares/httpError.js"

const Add = async function (req, res, next) {

    try {

        const { name, Email, password } = req.body

        if (!name || !Email || !password) {
            throw new httpError("all Field Are required")
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
            throw new httpError("no user found")
        }

        res.status(200).json({ message: "user data found", total: find.length, date: find })

    } catch (error) {
        throw next(new httpError(error.message))
    }

}

const login = async function (req, res, next) {

    try {

        const { Email, password } = req.body

        const user = await Model.findByCredentials(Email, password)

        const token = await user.generateAuthToken()

        res.status(200).json({ success: true, message: "login succesfully", user })

    } catch (error) {
        throw next(new httpError(error.message))
    }

}

const authLogin = async function (req, res, next) {

    try {

        const user = req.user

        if (!user) {
            throw new httpError("Unable to login", 401)
        }

        res.status(200).json({ success: true, message: "auth login succesfull", user })

    } catch (error) {
        throw next(new httpError(error.message))

    }

}

const Delete = async function (req, res, next) {

    try {


        await req.user.deleteOne()

        res.status(200).json({ success: true, message: "user deleted succesfullly" })

    } catch (error) {
        next(new httpError(error.message))
    }

}

const update = async function name(req, res, next) {

    try {

        const update = Object.keys(req.body)

        const allowedField = ["name", "password"]

        const isvalid = update.every((update) => {
            return allowedField.includes(update)
        })

        if (!isvalid) {
            throw new httpError("only allowed field can be update")
        }

        update.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.status(200).json({ success: true, message: "user updated successfully", user: req.user })



    } catch (error) {
        throw next(new httpError(error.message))
    }

}

const logout = async function (req, res, next) {

    try {

        req.user.tokens = req.user.tokens.filter((item) => {
            return item.token !== req.token
        })

        res.status(200).json({ success: true, message: "logout succesfullly" })

        await req.user.save()


    } catch (error) {
        throw new httpError(error.message)
    }

}

const logoutAll = async function name(req, res, next) {

    try {

        req.user.tokens = []

        await req.user.save()

        res.status(200).json({ success: true, message: "logout from all device successfull" })

    } catch (error) {
        throw new httpError(error.message)
    }

}




export default { Add, getAllUser, login, authLogin, Delete, logout, logoutAll ,update}