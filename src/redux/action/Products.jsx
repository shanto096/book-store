import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../api/baseURL";





export const addProduct = createAsyncThunk('addProduct', async ({ formData }) => {
    try {
        const res = await useAxios.post('/api/user/publish-book', formData)
        console.log(res?.data)
        return res?.data;
    }
    catch (error) {
        console.log(error.message);
    }
})
export const getAllProduct = createAsyncThunk('getAllProduct', async () => {
    try {
        const res = await useAxios.get(`/api/user/get-all-book?skip=0&limit=20`)

        return res?.data;
    }
    catch (error) {
        console.log(error.message);
    }
})
export const singleProduct = createAsyncThunk('singleProduct', async ({ id }) => {
    try {
        const res = await useAxios.get(`/api/user/get-single-book/${id}?skip=0&limit=20`)
        console.log(res.data)
        return res.data;
    }
    catch (error) {
        console.log(error.message);
    }
})
export const searchProduct = createAsyncThunk('searchProduct', async (name) => {
    try {
        const res = await useAxios.post(`/api/user/search-book`,name )
  console.log(res.data)
        return res?.data;
    }
    catch (error) {
        console.log(error.message);
    }
})
export const updateProduct = createAsyncThunk("updateProduct", async ({ formData, id }) => {
    try {
        const response = await useAxios.patch(`/api/user/update-book/${id}`, formData
        );

        return response?.data; // Assuming the API returns a token
    } catch (error) {
        throw new Error("update failed");
    }
}
);
export const deleteProduct = createAsyncThunk('deleteProduct', async ({ id }) => {

    try {
        const res = await useAxios.delete(`/api/user/delete-book/${id}`)
       console.log('res',res);
        return res.id;
    }
    catch (error) {
        console.log(error.message);
    }
})