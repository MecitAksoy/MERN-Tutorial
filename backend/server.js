import express from "express"
import dotenv from "dotenv"
import goalRoutes from "./routes/goalRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"

dotenv.config()

const port = process.env.PORT || 6000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/goals', goalRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

