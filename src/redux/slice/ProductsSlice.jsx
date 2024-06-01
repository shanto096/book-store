import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getAllProduct, searchProduct, singleProduct, updateProduct } from "../action/Products";
// import { addReview } from "../action/Rating";


const initialState = {
    loading: false,
    
    products: [],
    error: null,
    singleProductData:{},
    searchProducts:[],
    isDepend:false,
    status:null
  };
  
  const productsSlice = createSlice({
    name: "products",
    initialState,
  
    extraReducers: (builder) => {
      builder
        //  getAllProduct slice ..................
        .addCase(getAllProduct.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(getAllProduct.fulfilled, (state, {payload}) => {
          
          state.status=null
  
          state.products = payload.data;
        })
        .addCase(getAllProduct.rejected, (state) => {
          state.error= true;
        })
        //  singleProduct slice ..................
        .addCase(singleProduct.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(singleProduct.fulfilled, (state, {payload}) => {
          state.status = null;
  
          state.singleProductData = payload.data;
        })
        .addCase(singleProduct.rejected, (state) => {
          state.error= true;
        })
        //  searchProduct slice ..................
        .addCase(searchProduct.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(searchProduct.fulfilled, (state,  {payload}) => {
          state.status = null;
          state.searchProducts = payload?.data   
        
        })
        .addCase(searchProduct.rejected, (state) => {
          state.error= true;
        })
        
        // addProduct slice ..................

        .addCase(addProduct.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.status = null;
         state.products = [...state.products, action.payload.book];
        })
        .addCase(addProduct.rejected, (state) => {
          state.error = true;
        })

        // updateProduct silce ................
        .addCase(updateProduct.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state, {payload}) => {
          state.loading = false;
          const updateProduct = payload.data; 
          const updatedProductIndex = state.products.findIndex(
            ({ _id }) => _id === updateProduct._id
          );
  
          if (updatedProductIndex!== -1) {
            state.products[updatedProductIndex] = updateProduct;
          }
        })
        .addCase(updateProduct.rejected, (state) => {
          state.error = true;
        })
        // deleteProduct slice....................
        .addCase(deleteProduct.pending, (state) => {
          state.loading= true;
        })
        .addCase(deleteProduct.fulfilled, (state, {payload}) => {
          state.loading = false;
          console.log(payload);
          const deletedStudentId = payload;
          console.log(deletedStudentId);
          state.products = state.products.filter((book) =>
            book._id === deletedStudentId
              ? { ...book, deleted: true }
              : book
          );
          state.isDepend=!state.isDepend
        })
        .addCase(deleteProduct.rejected, (state) => {
          state.error = true;
        })
        
    },
  });
  
  export default productsSlice.reducer;