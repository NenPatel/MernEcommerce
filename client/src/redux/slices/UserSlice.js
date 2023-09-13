import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
  token:""
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    userLogin:(state,action) => {
        // console.log(action.payload);
        state.user = action.payload.user
        state.token = action.payload.token
        // state.user = action.payload.map(data => {
        //     return {user:data.user,token:data.token}
        // })
    },
    userUpdate:(state,action) => {
      // console.log(action.payload);
      state.user = action.payload.data.user
      state.token = action.payload.token
      // state.user = action.payload.map(data => {
      //     return {user:data.user,token:data.token}
      // })
  },
    userLogout : (state) => {
        state.user=null;
        state.token=""
    }


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
export const { userLogin,userLogout,userUpdate } = userSlice.actions

export default userSlice.reducer