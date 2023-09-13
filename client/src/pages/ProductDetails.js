import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'

const ProductDetails = () => {
    const {slug} = useParams()
    const [product,setProduct] = useState({})
    const [relatedProduct,setRelatedProduct] = useState([])

    useEffect(() => {
        if(slug) getProduct()
    },[slug])

    const getProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`)    
            setProduct(data?.product)
            // console.log(data.product);
            getSimilarProduct(data?.product._id,data?.product.category._id)
        } catch(error) {
            console.log(error);
        }
    }

    const getSimilarProduct = async (pid,cid) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout>
        <div className="row container product-details ">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="380"
            // width="350"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className='row container'>
        <h5>Similar Products ---</h5>
        {relatedProduct.length < 1 && <p>No Similar Products Found</p>}
        <div className='d-flex flex-wrap'>
            {relatedProduct?.map((p) => (
                <div className="card m-2" key={p._id} style={{width: "18rem"}} >
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" height="250" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0,30)}...</p>
                        <p className="card-text">${p.price}</p>
                        <button className='btn btn-secondary ms-1'>Add to Cart</button>
                      </div>
                </div>
                ))}
            </div>    
      </div>
    </Layout>
  )
}

export default ProductDetails