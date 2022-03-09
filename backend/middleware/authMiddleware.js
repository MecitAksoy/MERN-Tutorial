import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const protect = asyncHandler(async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from headers
            token = req.headers.authorization.split(' ')[1]
            //Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //Get user from token but remove password
            const user = await User.findById(decoded.userId).select('-password')
            req.user = user

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export default protect