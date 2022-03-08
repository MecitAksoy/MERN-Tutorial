import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Generate Token
const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

//@desc Authenticate user
//@route POST /api/v1/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    let user = await User.findOne({email})
    
    if(!user) {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    if(await bcrypt.compare(password, user.password)) {
        user = user.toObject()
        user.token = generateToken(user._id)
        delete user.password
        res.status(200).json({success: true, User: user})
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }    
})

//@desc Post user
//@route POST /api/v1/users
//@access Public
const postUser = asyncHandler(async (req, res) => {
    const {firstname, lastname, email, password} = req.body

    if(!firstname || !lastname ||  !email || !password) {
        res.status(400)
        throw new Error('Please add required fields')
    }

    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    let user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })
    if(user) {
        user = user.toObject()
        user.token = generateToken(user._id)
        res.status(201).json({success: true, User: user})
    } else {
        res.status(400)
        throw new Error("invalid user data")
    }
})

//@desc Get user data
//@route POST /api/v1/users/me
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
    const {_id, firstname, lastname, email} = await User.findById(req.user.id)
    const loggedInUser = {
        _id,
        firstname,
        lastname,
        email
    }
    res.status(200).json({success: true, user: loggedInUser})
})

export {
    postUser,
    loginUser,
    getCurrentUser
}