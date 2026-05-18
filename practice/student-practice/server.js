import express from "express"
import httpError from "./middlewares/httpError.js"

import dbConnect from "./config/db.js"

import route from "./routes/studentRoutes.js"

const app = express()

app.use(express.json())

app.use("/student", route)

app.get("/", (req, res) => {

    res.send("hello from server")

})


app.use((req, res) => {
    res.status(404)
        .json({ success: true, message: "requested route not found" })
})

app.use((Error, req, res, next) => {

    if (res.headersSent) {


        return next(error)
    }

    res.status(Error.statusCode || 500)
        .json({ message: Error.message || "something went wrong" })

})

const port = 5000;



async function server() {

    try {

        const connect = await dbConnect()

        if (!dbConnect) {
            throw new Error("failed to connect DB")
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }

            console.log(`server is running onn port ${port}`)
        })


    } catch (error) {
        console.log(error.message)

        process.exit(1)
    }

}

server()