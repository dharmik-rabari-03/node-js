import express from "express"
import httpError from "./middlewares/httpError.js"
import ConnectDB from "./config/DB.js"
import router from "./routes/userRoute.js"

import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use("/user",router)

app.get("/", (req, res, next) => {
    res.json("hello from server")
})

app.use((req, res, next) => {
    res.status(404).json({ success: true, message: "requested route not found" }, 404)

})

app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(new httpError(error.message))
    }

    res.status(error.statusCode || 500).json({ message: error.message || "internel server error" })


})

const port = 5000



async function StartServer(req, res, next) {

    try {

        const conenct = await ConnectDB()

        if (!conenct) {
            return next(new httpError("failed to conect DB"))
        }

        app.listen(port, (error) => {
            if (error) {
                return console.log(error.message)
            }

            console.log(`server running on port ${port}`)

        })

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }

}

StartServer()