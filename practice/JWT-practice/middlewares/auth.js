import JWT from "jsonwebtoken"
import Model from "../model/userModel.js"
const auth = async function (req, res, next) {

    try {

        const authHeader = req.header("Authorization")

        if (!authHeader) {
            throw new Error("auth header is required")
        }

        const token = authHeader.replace("Bearer ", "")

        const decoded = JWT.verify(token, process.env.JWT_SECRET)


        const user = await Model.findOne({
            _id: decoded._id,
            "tokens.token": token
        })

        req.user = user
        req.token = token

        next()

    } catch (error) {
        next(new Error(error.message))
    }

}

export default auth