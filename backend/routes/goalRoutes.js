import express from "express"
import { getGoals, postGoal, putGoal, deleteGoal } from "../controllers/goalController.js"

const goalRoutes = express.Router()

goalRoutes.route('/').get(getGoals).post(postGoal)
//Both of this could be done like this too:
//goalRoutes.route('/:id').put(putGoal).delete(deleteGoal)
goalRoutes.put('/:id', putGoal)

goalRoutes.delete('/:id', deleteGoal)

export default goalRoutes