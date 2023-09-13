import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const requireSignIn = async (req,res,next) => {
    try {
        
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET) 
        // verify method basically verfiy encoded token with secret key and if the verification comes
        // true then it returns decoded token else it throws error which get caught in catch block.
        // payload means object
        // decode return payload which means an object that is having _id:value in it
        // decode return  ==> { _id : decoded-Id which is present in database}
        req.user = decode
        next();

    } catch(error) {
        // console.log("error in JWT Token");
        console.log(error);
    }
}

export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById({_id:req.user._id})
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access"
            })
        }
        else{
            next()
        }

    } catch(error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Error in Admin Middleware",
            error
        })
    }
}