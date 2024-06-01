import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../api/baseURL";








  

export const loginAuth = createAsyncThunk('loginAuth', async ({Data})=>{
    try {
        const res = await  useAxios.post('/api/auth/login',Data)
        console.log(res?.data?.data);
        return res;
      
    }
     catch (error) {
        console.log(error.message);
    }
})
export const registerAuth = createAsyncThunk('registerAuth', async ({formData})=>{
    try {
        const res = await useAxios.post('/api/auth/register', formData)
        console.log(res.data);
        return res?.data;
    }
     catch (error) {
        console.log(error.message);
    }
})