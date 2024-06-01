import { createSlice } from "@reduxjs/toolkit";
import { loginAuth,  } from "../action/Auth";


  
  
const initialState = {
  status: "idle",
  isAuthenticated: false,
  user: null,
  error: null,
  accessToken: null, // Add access token field
};
  
  
  const authSlice  = createSlice({
     
     name :'login',
     initialState,
    reducers:{
      // logout(state) {
      //   state.user = null;
      //   state.accessToken = null;
      // },
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(loginAuth.pending, (state) => {
          state.status = "pending";
        })
        .addCase(loginAuth.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.isAuthenticated = true;
          state.user = action.payload.loggedUser;
          state.accessToken = action.payload.jwtToken;
          state.error = action?.payload?.data?.error;
        })
        .addCase(loginAuth.rejected, (state) => {
          state.status = "idle";
          state.error = "Wrong Password!";
        });
  }
}, 
  )
  export const {logout}  = authSlice.actions

  export default authSlice.reducer