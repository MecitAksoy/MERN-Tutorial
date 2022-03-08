import express from "express"
import { getGoals, postGoal, putGoal, deleteGoal } from "../controllers/goalController.js"
import protect from "../middleware/authMiddleware.js"

const goalRoutes = express.Router()

goalRoutes.route('/').get(protect, getGoals).post(protect, postGoal)
//Both of this could be done like this too:
//goalRoutes.route('/:id').put(putGoal).delete(deleteGoal)
goalRoutes.put('/:id', protect, putGoal)

goalRoutes.delete('/:id', protect, deleteGoal)

export default goalRoutes