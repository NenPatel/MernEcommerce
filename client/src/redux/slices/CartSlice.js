import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart:[],
  totalQuantity : 0,
  totalPrice : 0,
  successPay:false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart:(state,action) => {
      // console.log(action.payload);
      // state.cart.push(action.payload)
      // console.log(state.cart);
      let find = state.cart.findIndex((item) => item._id === action.payload._id)
            if(find>=0){
                state.cart[find].quantity += 1
            }
            else{
            state.cart.push(action.payload)
            }
            // console.log(action.payload);
    },

    clearCart : (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.successPay = false
    },

    setPay : (state) => {
      state.successPay = true
    },

    getCartTotal : (state) => {
      let {totalQuantity,totalPrice} = state.cart.reduce(
          (cartTotal,cartItem) => {
              // console.log("cartTotal",cartTotal)
              // console.log("cartItem",cartItem)
              const {price,quantity} = cartItem
              // console.log(price,quantity)
              const itemTotal = price*quantity;
              cartTotal.totalPrice += itemTotal
              cartTotal.totalQuantity += quantity
              return cartTotal
          },
          {
              totalPrice : 0,
              totalQuantity : 0,
          }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity
  },

    removeItem : (state,action) => {
      // console.log(action.payload);
      state.cart = state.cart.filter((item) => item._id !== action.payload)
      // console.log(state.cart);
    },
    increaseQuantity : (state,action) => {
      state.cart = state.cart.map((item) => {
          if(item._id === action.payload){
              return { ...item, quantity : item.quantity + 1 }
          }
          return item;
      }) 
      // console.log(state.cart);
    },
    decreaseQuantity : (state,action) => {
      state.cart = state.cart.map((item) => {
          if(item._id === action.payload){
              if(item.quantity <= 1)
              return { ...item, quantity : item.quantity  }
              else {
                  return { ...item, quantity : item.quantity - 1 }
              }
          }
          return item;
      }) 
      // console.log(state.cart);
    }

    // userLogin:(state,action) => {
    //     console.log(action.payload);
    //     state.user = action.payload.user
    //     state.token = action.payload.token
    //     // state.user = action.payload.map(data => {
    //     //     return {user:data.user,token:data.token}
    //     // })
    // },
    // userLogout : (state) => {
    //     state.user=null;
    //     state.token=""
    // }


    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,clearCart,setPay,getCartTotal,removeItem,increaseQuantity,decreaseQuantity } = cartSlice.actions

export default cartSlice.reducer