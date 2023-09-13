import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keyword:"",
  results:[]
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    setData:(state,action) => {
        // console.log(action.payload);
        state.keyword = action.payload.keyword
        state.results = action.payload.results
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
export const {setData  } = searchSlice.actions

export default searchSlice.reducer