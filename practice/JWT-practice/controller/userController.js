import httpError from "../middlewares/httpError.js"
import user from "../model/userModel.js"

const add = async (req, res, next) => {


    try {

        const { userName, userEmail, Password } = req.body
        console.log(req.body);
        const newUser = new user({
            userName,
            userEmail,
            Password
        })

        await newUser.save()

        res.status(201).json({ success: true, message: "new user added", newUser })

    } catch (error) {
        throw new httpError(error.message)
    }

}

const GetAlluser = async function (req, res, next) {
    try {
        const find = await user.find()

        if (find.length === 0) {
            return new httpError("no user found", 404)
        }

        res.status(200).json({ success: true, message: "user found", find })

    } catch (error) {
        next(new httpError(error.message))
    }
}

const loggin = async (req, res, next) => {

    try {

        const { userEmail, Password } = req.body

        const users = await user.findByCredentials(userEmail, Password)


        const token = await users.generateAuthToken()

        res.status(200).json({ success: true, message: "user login successfull", users ,token})

        // console.log("controller users", users)

    } catch (error) {
        next(new httpError(error.message))
    }
}

const AuthLogin = async function (req, res, next) {

    try {


        const user = req.user

        if (!user) {
            return next(new httpError("unable to login", 401))
        }

        res.status(200).json({ success: true, user })

    } catch (error) {
        next(new httpError(error.message))
    }

}

export default { add, GetAlluser, loggin, AuthLogin }