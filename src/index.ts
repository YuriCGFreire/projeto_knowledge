import express from "express"
import "reflect-metadata"
import { routes } from "./routes"
import "./database"
const app = express()
const port = 8080

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})