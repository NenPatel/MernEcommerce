import productModel from "../models/productModel.js";
import fs from "fs"
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
// const strippe = require("stripe")
const stripe = new Stripe("sk_test_51Np4l7SEI8TXSEsx1IY7dvTLaOEmy2TB6tb6RZGBqCm243Ycfnp45ze8WGll9I3F5peoKeiNGkGMywa7cbkf6Ikv00Mka6cGx4")

export const createProductController = async (req,res) => {
    try {
        // console.log("Reached server");
        const {name,description,price,category,shipping} = req.fields
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({message:"Name is Required"})
            case !description:
                return res.status(500).send({message:"Description is Required"})
            case !price:
                return res.status(500).send({message:"Price is Required"})        
            case !category:
                return res.status(500).send({message:"Category is Required"})
            // case !quantity:
            //     return res.status(500).send({message:"Quantity is Required"})    
            case photo && photo.size > 1000000 :
                return res.status(500).send({message:"Photo is Required and should be less than 1Mb"})    
        }
        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product created Successfully",
            products
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Creating Product"
        })
    }
}

export const getProductController = async (req,res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"All Products",
            countTotal:products.length,
            products
            
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Getting Product"
        })
    }
}

export const getSingleProductController = async (req,res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(200).send({  //  find method return array of documents that is objects
            success:true,   //  whereas findOne method return a single document(object)
            message:"Single Product Fetched",
            product
            
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Getting Single Product"
        })
    }
}

// export const getSingleProductInfoController = async (req,res) => {
//     try {
//         const product = await productModel.findOne({slug:req.params.slug}).populate('category')
//         res.status(200).send({  //  find method return array of documents that is objects
//             success:true,   //  whereas findOne method return a single document(object)
//             message:"Single Product Fetched",
//             product
            
//         })

//     } catch(error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             error,
//             message:"Error while Getting Single Product"
//         })
//     }
// }

export const productPhotoController = async (req,res) => {
    try {
        const product = await productModel.findById({_id:req.params.pid}).select("photo")
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType)
            res.status(200).send(product.photo.data)
        }

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Getting Photo"
        })
    }
}

export const deleteProductController = async (req,res) => {
    try {
        await productModel.findByIdAndDelete({_id:req.params.pid}).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully"
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Deleting Product"
        })
    }
}

export const updateProductController = async (req,res) => {
    try {
        const {name,description,price,category,shipping} = req.fields
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({message:"Name is Required"})
            case !description:
                return res.status(500).send({message:"Description is Required"})
            case !price:
                return res.status(500).send({message:"Price is Required"})        
            case !category:
                return res.status(500).send({message:"Category is Required"})
            // case !quantity:
            //     return res.status(500).send({message:"Quantity is Required"})    
            case photo && photo.size > 1000000 :
                return res.status(500).send({message:"Photo is Required and should be less than 1Mb"})    
        }
        const products = await productModel.findByIdAndUpdate({_id:req.params.pid},
            {...req.fields,slug:slugify(name)},{new:true}
            )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product Updated Successfully",
            products
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Updating Product"
        })
    }
}

export const productFiltersController = async (req,res) => {
    try {
        const {checked,radio} = req.body
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte : radio[0], $lte : radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products,
            message:"Product Filtered Successfully"
        })

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error while Filtering Product"
        })
    }
}

export const productCountController = async (req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,
            message:"Product counted Successfully"
        })
    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error while Counting Product"
        })
    }
}

export const productListController = async (req,res) => {
    try {
        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page-1) * perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products,
        })

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error in per page ctrl"
        })
    }
}

export const searchProductController = async (req,res) => {
    try {
        const {keyword} = req.params
        const results = await productModel.find({
            $or: [
                { name : { $regex: keyword, $options: "i" } },
                { description : { $regex: keyword, $options: "i" } },
            ],
        })
        .select("-photo")
        res.json(results)

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error in Search Product"
        })
    }
}

export const relatedProductController = async (req,res) => {
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category:cid,
            _id:{ $ne : pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success:true,
            products
        })

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error in Related Product"
        })
    }
}

export const productCategoryController = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category:category}).populate("category")
        res.status(200).send({
            success:true,
            products
        })

    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error while Getting Product"
        })
    }
}

export const productPaymentController = async (req,res) => {
    try {
        const {cart} = req.body
        const lineItems = cart.map((product) => ({
            price_data:{
                currency:"usd",
                product_data : {
                    name: product.name
                },
                unit_amount: product.price * 100, 
            },
            quantity: product.quantity, 
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems, 
            mode: 'payment',
            success_url: `http://localhost:3000/dashboard/user/orders`,
            cancel_url: `http://localhost:3000/`,
          });
        //   console.log(session);
          const cartItem = []
          cart.forEach(element => {
            cartItem.push(element)
          });
          const order = await new orderModel({
            products:cart,
            cartItem:cartItem,
            payment:session,
            buyer:req.user._id
          }).save()
          res.json({ id: session.id });


    } catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"Error while Checkout"
        })
    }
}