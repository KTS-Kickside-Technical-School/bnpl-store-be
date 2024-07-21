import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import router from "./router/index.js"
import dbConnection from "./databases/config/config.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "./swagger.json" assert { type: 'json'};
import bodyParser from "body-parser"

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/v1", router)

const port = process.env.PORT || 5000


app.listen(port, () => console.log(`App listening on http://localhost:${port}`))



export default app