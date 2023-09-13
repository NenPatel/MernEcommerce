import axios from 'axios'
import React, { useEffect, useState } from 'react'
import  toast  from 'react-hot-toast'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const {Option} = Select

const CreateProduct = () => {

  const navigate = useNavigate()
  const {user,token} = useSelector(state => state.userData)
  const [categories,setCategories] = useState([])
  const [details,setDetails] = useState({
    name:"",
    description:"",
    price:"",
    // quantity:"",
  })
  const [category,setCategory] = useState("")
  const [shipping,setShipping] = useState("")
  const [photo,setPhoto] = useState("")

  const getAllCategory = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){
        setCategories(data?.category)
      }
    } catch(error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    getAllCategory()
  },[])

  const handleChange = (e) => {
    const {name,value} = e.target
    setDetails((prev) => (
      {...prev,[name]:value}
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,{
        name:details.name,
        description:details.description,
        price:details.price,
        // quantity:details.quantity,
        category:category,
        shipping:shipping,
        photo:photo
      },
      {
        headers: {  //  header section which contains authorization having token is used when 
          Authorization: token, //middleware requireSignIn is used in backend for controller
          "Content-Type":"multipart/form-data" 
           // the above property is used for formidable used in backend
        }
      }
      )
      if(data?.success){
        toast.success(data.message)
        // console.log("successful");
        setTimeout(() => {
          navigate("/dashboard/admin/products")
      },2000)
      }
      else{
        toast.error(data.message)
        // console.log("Failure");
      }
    } catch(error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title="Create Product">
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
        <form onSubmit={handleSubmit}>
          <h1>Create Product</h1>
          <div className='m-1 w-75' >
            <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(val) => setCategory(val)}>
              {categories?.map(c => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
            <div className='mb-3'>
              <label className='btn btn-outline-secondary col-md-12'>
                {photo ? photo.name : "Upload Photo"} 
                   <input type="file"  name='photo'  accept='image/*'  onChange={(e) => setPhoto(e.target.files[0])} hidden />
              </label>
            </div>
            <div className='mb-3'>
              {photo &&  (
                <div className='text-center'>
                  <img src={URL.createObjectURL(photo)} alt="product" height="200px" className="image image-responsive" />
                </div>
              )}
            </div>
            <div className='mb-3'>
            <input type="text" value={details.name} name="name" placeholder="Enter Name" className='form-control' onChange={handleChange } />
            </div>
            <div className='mb-3'>
            <textarea
                  type="text" name="description"
                  value={details.description}
                  placeholder="Enter description"
                  className="form-control"
                  onChange={handleChange}
                />
            </div>
            <div className='mb-3'>
            <input type="number" name="price" value={details.price} placeholder="Enter Price" className='form-control' onChange={handleChange } />
            </div>
            {/* <div className='mb-3'>
            <input type="number" name="quantity" value={details.quantity} placeholder="Enter Quantity" className='form-control' onChange={handleChange } />
            </div> */}
            <div className='mb-3'>
            <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
            </div>
            <div className='mb-3'>
              <button className='btn btn-primary'>Create Product</button>
            </div>
          </div>
          </form>
        </div>
    </div>
    </div>
</Layout>
  )
}

export default CreateProduct