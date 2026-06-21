import express from "express"
import httpError from "./middlewares/httpError.js"
import connectDB from "./config/db.js"
import route from "./routes/userRoute.js"

import dotenv from "dotenv"

dotenv.config({ path: "./.env" })
const app = express()

app.use(express.json())
app.use("/user", route)

app.get("/", (req, res, next) => {

    res.json({ message: "hello from server" })

})

app.use((req, res, next) => {
    res.status(404).json({ message: "requested route not found" })
})

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error)
    }

    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" })

})

const port = 5000



async function startServer(req, res, next) {

    try {

        const connect = await connectDB()




        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }

            console.log(`server running on port ${port}`)
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }


}

startServer()