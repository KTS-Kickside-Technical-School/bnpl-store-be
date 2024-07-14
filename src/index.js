import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import router from "./router/index.js"
import dbConnection from "./databases/config/config.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1", router)

const port = process.env.PORT || 5000


app.listen(port,()=> console.log(`App listening on http://localhost:${port}`))