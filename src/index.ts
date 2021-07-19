import express from "express"
const app = express()
const port = 8080

app.use(express.json())

app.get("/", (req, res) => {
    res.json({ "Message": "Gordo arrombado!" })
})

app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})