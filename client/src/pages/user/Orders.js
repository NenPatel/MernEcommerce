import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import moment from "moment"
import axios from 'axios'
import { clearCart } from '../../redux/slices/CartSlice'

const Orders = () => {
  const [orders,setOrders] = useState([])
  const {token} = useSelector(state => state.userData)
  const {successPay} = useSelector(state => state.cartData)
  const dispatch = useDispatch()
  const getOrders = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`,
      {
        headers: {  //  header section which contains authorization having token is used when 
          Authorization: token, //middleware requireSignIn is used in backend for controller
        }
      })
      setOrders(data)
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(successPay){
      // console.log(successPay);
      dispatch(clearCart())
    }
  },[])

  useEffect(() => {
    if(token) {
      getOrders()
    }
  },[token])
  return (
    <Layout title="User - Orders">
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Orders</h1>
          {
            orders?.map((o,i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).format("MMM Do YYYY")}</td>
                        <td>{o?.payment.id ? "Success" : "Failed"}</td>
                        <td>{o?.cartItem?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.cartItem?.map((p, i) => (
                      <div className="row mb-2 p-2 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"180px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : ${p.price}</p>
                          <p>Quantity : {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          }
        </div>
    </div>
    </div>
</Layout>
  )
}

export default Orders