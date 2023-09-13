import axios from 'axios'
import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import  toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgotpassword`,{
                email : email
            })
            if(res.data.success){
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate("/login")
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
    <Layout title="Forgot Password">
        <div className='register'>
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
           
            <div className="mb-3">
                <input type="email" className="form-control" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </div>
            {/* <div className="mb-3">
                <input type="password" className="form-control" name='password' onChange={handleChange} value={details.password} placeholder='Password' id="exampleInputPassword1" required />
            </div>
            <div className='mb-3'>
                <Link to="/forgotpassword" >Forgot Password ?</Link>
            </div> */}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword