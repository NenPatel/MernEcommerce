import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer"
import orderModel from "../models/orderModel.js";

export const registerController = async (req,res) => {
    try {

        const {name,email,password,phone,address} = req.body
        
        if(!name || !email || !password || !phone || !address){
            return res.send({message:"Fill all input fields"})
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already Registered, Please Login"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()
        //                               OR
        // const user = new userModel({name,email,phone,address,password:hashedPassword})
        // const savedUser = await user.save();
        
        res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
}

export const loginController = async (req,res) => {
    try {

        const {email,password} = req.body

        if(!email || !password){
            return res.send({message:"Fill all input fields"})
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email Not Registered"
            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await JWT.sign( {_id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"} )
        // sign method basically used to encode the id using the secret key to form token

        return res.status(200).send({
            success:true,
            message:"Login Successfull",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

export const testController = (req,res) => {
    try {
        res.send("Protected Routes")
    } catch(error) {
        console.log(error);
        res.send({error})
    }
}

export const forgotPassword = async (req,res) => {
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"No Registered User Found"
            })
        }
        const token = JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:"1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nenspatelstudy@gmail.com',
              pass: 'vugelkextwcbywnw'
            }
          });
          
          var mailOptions = {
            from: 'nenspatelstudy@gmail.com',
            to: `${user.email}`,
            subject: 'Reset your Password',
            text: `http://localhost:3000/resetpassword/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
            //   console.log('Email sent: ' + info.response);
                return res.send({
                    success:true,
                    message:"Password Reset Mail Sent"
                })
            }
          });

    } catch(error) {
        console.log(error);
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {id,token} = req.params
        const {password} = req.body
        JWT.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err){
                return res.send({
                    success:false,
                    message:"Error with token"
                })
            }
            else{
                hashPassword(password).then(hashedPassword => {
                userModel.findByIdAndUpdate({_id: id}, {
                    password:hashedPassword
                }).then(user => res.send({
                    success:true,
                    message:"Password Updated Successfully"
                }))
                .catch(err => res.send(err))
            }).catch(err => res.send(err))
            }
        })
    } catch(error) {
        console.log(error);
    }
}

export const updateProfileController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body
        const hashedPassword = await hashPassword(password)
        const user = await userModel.findByIdAndUpdate({_id:req.user._id},{
            name,email,password:hashedPassword,phone,address // above id coming from require sign middleware
        },{
            new:true
        })
        res.status(200).send({
            success:true,
            user,
            message:"Profile Updated Successfully"
        })

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in Update Profile",
            error
        })
    }
}

export const getOrdersController = async (req,res) => {
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate("buyer","name").sort({createdAt:"-1"})
        res.json(orders)
    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in Getting Orders",
            error
        })
    }
}

export const getAllOrdersController = async (req,res) => {
    try {
        const orders = await orderModel.find().populate("buyer","name").sort({createdAt:"-1"})
        res.json(orders)

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in Getting All Orders",
            error
        })
    }
}

export const orderStatusController = async (req,res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate({_id:orderId},
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in Orders",
            error
        })
    }
}

export const getUsersController = async (req,res) => {
    try {
        const users = await userModel.find({})
        res.json(users)
    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error in Getting Users",
            error
        })
    }
}