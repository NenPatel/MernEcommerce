import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import  toast  from 'react-hot-toast';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userUpdate } from '../../redux/slices/UserSlice';
// import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const dispatch = useDispatch()
  const {user,token} = useSelector(state => state.userData)
  const [details,setDetails] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:""
})

useEffect(() => {
  // const {email,name,phone,address,password} = user
  setDetails(user)
},[user])

const handleChange = (e) => {
    const {name,value} = e.target;
    setDetails((preVal) => (
        {...preVal,[name]:value}
    ))
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{
            name:details.name,
            email:details.email,
            password:details.password,
            phone:details.phone,
            address:details.address,
        },
        {
          headers: {  //  header section which contains authorization having token is used when 
            Authorization: token, //middleware requireSignIn is used in backend for controller
            // "Content-Type":"multipart/form-data" 
             // the above property is used for formidable used in backend
          }
        }
        )
        if(data?.success){
            // console.log(details);
            toast.success(data?.message)
            dispatch(userUpdate({data,token}))
            // setTimeout(() => {
            //     navigate("/login")
            // },2000)
        }
        else{
            toast.error(data?.message)
        }

    } catch(error) {
        console.log(error);
        toast.error("Something went wrong")
    }
 
}      // optional chaining  --> details?.name here ? is used as & operator and it waits 
                 // untill it gets the data and then it shows the required message or name 

  return (
    <Layout title="User - Profile">
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>       
        <div className='col-md-9'>
          <div className='register'>
        <h1>Profile Page</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" name='name' onChange={handleChange} value={details?.name} placeholder='Name' id="exampleInputName"  required />
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" name='email' onChange={handleChange} value={details?.email} placeholder='Email' id="exampleInputEmail1"  required disabled />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" name='password' onChange={handleChange} value={details?.password} placeholder='Password' id="exampleInputPassword1" required />
            </div>
            <div className="mb-3">
                <input type="number" className="form-control" name='phone' onChange={handleChange} value={details?.phone} placeholder='Phone No' id="exampleInputPhone" required />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" name='address' onChange={handleChange} value={details?.address} placeholder='Address' id="exampleInputAddress" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        </div>
    </div>
    </div>
</Layout>
  )
}

export default Profile