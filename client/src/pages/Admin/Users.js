import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const Users = () => {
  const [users,setUsers] = useState([])
  const {token} = useSelector(state => state.userData)
  const getUsers = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/users`,
      {
        headers: {  //  header section which contains authorization having token is used when 
          Authorization: token, //middleware requireSignIn is used in backend for controller
        }
      })
      setUsers(data)
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(token) {
      getUsers()
    }
  },[token])

  return (
    <Layout title="Admin - Users">
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <h1 className='text-center'>All Users</h1>
              <div className="border shadow" >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
              {
            users?.map((o,i) => {
              return (
                
                    <tbody key={o._id}>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?._id}</td>
                        <td>{o?.name}</td>
                        <td>{o?.email}</td>
                        <td>{o?.phone}</td>
                        <td>{o?.address}</td>
                        <td>{o?.role}</td>
                      </tr>
                    </tbody>
                    )})}
                  </table>
                  </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Users