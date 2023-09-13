import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import  toast  from 'react-hot-toast';
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/slices/UserSlice';

const Login = () => {
 
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const [details,setDetails] = useState({
        email:"",
        password:"",
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
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
                email:details.email,
                password:details.password,
            })
            if(res.data.success){
                // console.log(details);
                toast.success(res.data.message)
                // console.log(res.data);
                dispatch(userLogin(res.data))
                setTimeout(() => {
                    navigate(location.state || "/")
                },1000)
                

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
    <Layout title="Login">
        <div className='register'>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
           
            <div className="mb-3">
                <input type="email" className="form-control" name='email' onChange={handleChange} value={details.email} placeholder='Email' id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" name='password' onChange={handleChange} value={details.password} placeholder='Password' id="exampleInputPassword1" required />
            </div>
            <div className='mb-3'>
                <Link to="/forgotpassword" >Forgot Password ?</Link>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>
  )
}


export default Login