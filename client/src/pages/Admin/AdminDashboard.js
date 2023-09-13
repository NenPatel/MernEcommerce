import React from 'react'
import { useSelector } from 'react-redux'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'


const AdminDashboard = () => {
  const {user,token} = useSelector(state => state.userData)
  return (
    <Layout title="Admin Dashboard">
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>Admin Name : {user?.name}</h3>
                <h3>Admin Email : {user?.email}</h3>
                <h3>Admin Phone : {user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard