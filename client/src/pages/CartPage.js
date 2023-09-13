import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { clearCart, decreaseQuantity, increaseQuantity, removeItem, setPay } from '../redux/slices/CartSlice'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'

const CartPage = () => {
  const {user,token} = useSelector(state => state.userData)
  const {cart,totalQuantity,totalPrice} = useSelector(state => state.cartData)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const totalPrice = () => {
  //   try {
  //     let total = 0;
  //     cart?.map((item) => {
  //       total = total + item.price*item.quantity;
  //     });
  //     return total.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const removeCartItem = (pid) => {
    try {
      // let myCart = [...cart];
      // let index = myCart.findIndex((item) => item._id === pid);
      // myCart.splice(index, 1);
      // setCart(myCart);
      // localStorage.setItem("cart", JSON.stringify(myCart));
      dispatch(removeItem(pid))
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (pid) => {
    try {
      dispatch(increaseQuantity(pid))
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubtract = (pid) => {
    try {
      dispatch(decreaseQuantity(pid))
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51Np4l7SEI8TXSEsxXb2B3ZliMLxd1kIU9o3S2U3K2JH1DlCcL0pVlrT5H6tpV9Qzbnm7Y7KRv2AKsUIQfoNCsB8K001xahcng5");
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-payment`,
    {
      cart
    },
    {
      headers: {  //  header section which contains authorization having token is used when 
        Authorization: token, //middleware requireSignIn is used in backend for controller
      }
    })
    const result = stripe.redirectToCheckout({
      sessionId:data.id
    })
    // console.log(result);
    dispatch(setPay())
    if(result.error){
      console.log(result.error);
    }
  }

  // useEffect(() => {       header page useeffect gets called on cart change so not required
  //   dispatch(getCartTotal())
  // },[cart])


  return (
    <Layout>
      <div className='container'>
        <div className='row'>
        <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!user
                ? "Hello Guest"
                : `Hello  ${token && user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"200px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : ${p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button><br/> <br/>
                    <button className="btn btn-success" onClick={() => handleAdd(p._id)}>+</button>
                    {p.quantity}
                    <button className="btn btn-success" onClick={() => handleSubtract(p._id)}>-</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              {/* <h4>Total : {totalPrice()} </h4> */} 
              <h4>Total Price : ${totalPrice} </h4>
              <h4>Total Items : {totalQuantity} </h4>
              {user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {/* {!clientToken || !token || !cart?.length ? (
                  ""
                ) : ( */}
                  <>
                    {/* <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    /> */}

                    {user && <button className='btn btn-primary' onClick={makePayment}>CheckOut</button>
                    }

                    {/* <button
                      className="btn btn-primary"
                      // onClick={handlePayment}
                      disabled={loading || !instance || !user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button> */}
                  </>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      </div>
    </Layout>
  )
}

export default CartPage