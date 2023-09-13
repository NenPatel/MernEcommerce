import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import  toast  from 'react-hot-toast';
import Layout from '../../components/layout/Layout'

const ResetPassword = () => {
    const navigate = useNavigate()
    const [password,setPassword] = useState("")
    const {id,token} = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/resetpassword/${id}/${token}`,{
                password:password
            })
            if(res.data.success){
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate("/login")
                },1000)
            }
            else{
                toast.error("error")
                // console.log(res.data);
            }

        } catch(error) {
            console.log(error);
            toast.error("Something went wrong")
        }

    }

  return (
    <Layout title="Reset Password">
        <div className='register'>
        <h3>Reset Password</h3>
        <form onSubmit={handleSubmit}>
           
            <div className="mb-3">
                <input type="password" className="form-control" name='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='New Password' id="exampleInputEmail1" aria-describedby="emailHelp" required />
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

export default ResetPassword