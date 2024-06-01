import { createSlice } from "@reduxjs/toolkit";

  
  
   const initialState ={
    basket:[],
    status:'',
    error:null,

   }
  
  
  const basketSlice  = createSlice({
     
     name :'basket',
     initialState,
     
     reducers:{
      cart(state,action) {
         state.basket = [...state.basket,action?.payload];
       },
       removeCart(state,action){
         state.basket = state.basket.filter((item)=>(item._id !== action?.payload?.id))
       }
     }
}, 
  )

  export const {cart, removeCart} = basketSlice.actions

  export default basketSlice.reducer