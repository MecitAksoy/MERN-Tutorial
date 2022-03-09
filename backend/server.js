import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import goalRoutes from "./routes/goalRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"
import colors from "colors"
import connectDb from "./config/db.js"

dotenv.config()

connectDb()
const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/goals', goalRoutes)
app.use('/api/v1/users', userRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

