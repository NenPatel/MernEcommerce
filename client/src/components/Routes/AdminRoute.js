import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok,setOk] = useState(false)
    const {user,token} = useSelector(state => state.userData)

    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,{
                headers:{
                    "Authorization": token
                }
            })
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(token) {
            authCheck()
        }
    },[token])

    return ok? <Outlet /> : <Spinner path="" />
}