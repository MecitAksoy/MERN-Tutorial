import asyncHandler from "express-async-handler"
import Goal from "../models/goalModel.js"
import userModel from "../models/userModel.js"
import User from "../models/userModel.js"


//@desc Get goals
//@route GET /api/v1/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json({success: true, goals: goals})
})

//@desc Post goal
//@route POST /api/v1/goals
//@access Private
const postGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error(`Please add text field`)
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json({success: true, Goal: goal})
})

//@desc Update goal
//@route PUT /api/v1/goals/:id
//@access Private
const putGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("Goal not found");
    }
    // const user = await User.findById(req.user.id)
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString() !== req.user.id) {
        res.status(400)
        throw new Error("Not users goal")
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({success: true, Goal: updateGoal})
})

//@desc Delete goal
//@route DELETE /api/v1/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new console.error("Goal not found");
    }

    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString() !== req.user.id) {
        res.status(400)
        throw new Error("Not users goal")
    }

    await goal.remove()
    res.status(200).json({success: true, message: `Goal ${goal._id} deleted`})
    // Goal.findByIdAndDelete(req.params.id, (err,docs) =>  {
    //     if (err) {
    //         res.status(400)
    //         throw new Error("Goal not found");
    //     } else {
    //         res.status(200).json({success: true, message: `Goal ${req.params.id} deleted`})
    //     }
    // })
    
})

export {
    getGoals,
    postGoal,
    putGoal,
    deleteGoal,
}
