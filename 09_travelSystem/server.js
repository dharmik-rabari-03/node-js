import express from "express"
import httpError from "./middlewares/httpError.js"

import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import connectDB from "./config/db.js"




const app = express()

app.get("/", (req, res, next) => {

    res.json("hello from server")

})

app.use((req, res, next) => {
    res.status(404).json("requested route not found")
})

app.use((Error, req, res, next) => {

    if (res.headersSent) {
        return console.log("Database connection failed")
    }

    res.status(Error.statusCode || 500)
        .json({ message: Error.message || "something went wrong" })

})

const port = process.env.PORT || 5000;




async function startServer(req, res, next) {

    try {

        const connect = await connectDB()

        if (!connect) {
            throw new httpError("Database connection failed", 500)
        }


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