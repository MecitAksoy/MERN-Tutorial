import asyncHandler from "express-async-handler"

//@desc Get goals
//@route GET /api/v1/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({success: true, message: 'Get goals'})
})

//@desc Post goal
//@route POST /api/v1/goals
//@access Private
const postGoal = asyncHandler(async (req, res) => {
    console.log(req.body)
    if(!req.body.text) {
        res.status(400)
        throw new Error(`Please add text field`)
    }
    res.status(200).json({success: true, message: 'Post goal'})
})

//@desc Update goal
//@route PUT /api/v1/goals/:id
//@access Private
const putGoal = asyncHandler(async (req, res) => {
    res.status(200).json({success: true, message: `Put goal ${req.params.id}`})
})

//@desc Delete goal
//@route DELETE /api/v1/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({success: true, message: `Delete goal ${req.params.id}`})
})

export {
    getGoals,
    postGoal,
    putGoal,
    deleteGoal,
}
