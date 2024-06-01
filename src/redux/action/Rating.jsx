import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../api/baseURL";


export const addReview = createAsyncThunk('addReview', async ({Data,id})=>{
    try {
        const res = await  useAxios.post(`/api/user/give-review-rating/${id}`,Data)
         console.log(res?.data);
        return res?.data;
    }
     catch (error) {
        console.log(error.message);
    }
})
