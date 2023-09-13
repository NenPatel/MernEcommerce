import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Dashboard = () => {
  const {user,token} = useSelector(state => state.userData)
  return (
    <Layout title="Dashboard">
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h3>User Name : {user?.name}</h3>
                <h3>User Email : {user?.email}</h3>
                <h3>User Address : {user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>     
  )
}

export default Dashboard