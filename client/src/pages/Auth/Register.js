import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import  toast  from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:""
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setDetails((preVal) => (
            {...preVal,[name]:value}
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{
                name:details.name,
                email:details.email,
                password:details.password,
                phone:details.phone,
                address:details.address,
            })
            if(res.data.success){
                // console.log(details);
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate("/login")
                },2000)
            }
            else{
                toast.error(res.data.message)
            }

        } catch(error) {
            console.log(error);
            toast.error("Something went wrong")
        }
     
    }

  return (
    <Layout title="Register">
        <div className='register'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" name='name' onChange={handleChange} value={details.name} placeholder='Name' id="exampleInputName" aria-describedby="nameHelp" required />
            </div>
            <div className="mb-3">
                <input type="email" className="form-control" name='email' onChange={handleChange} value={details.email} placeholder='Email' id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" name='password' onChange={handleChange} value={details.password} placeholder='Password' id="exampleInputPassword1" required />
            </div>
            <div className="mb-3">
                <input type="number" className="form-control" name='phone' onChange={handleChange} value={details.phone} placeholder='Phone No' id="exampleInputPhone" required />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" name='address' onChange={handleChange} value={details.address} placeholder='Address' id="exampleInputAddress" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>
  )
}

export default Register