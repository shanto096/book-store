import { useEffect, useState } from "react";
import ProductAddModal from "../component/ProductAddModal";
import addIcon from '../assets/add.svg';
import deleted from '../assets/delete.svg';
import edit from '../assets/edit.svg';
import EditProduct from "../component/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct } from "../redux/action/Products";
import PageLoader from "../component/PageLoader";





const CustomizeProduct = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const {products,isDepend,status}= useSelector((state)=> state.products)
const dispatch = useDispatch()

    //   book delete function....................
    const handleDelete = (id) =>{
         dispatch(deleteProduct({ id: id }) );
            
        }

    //   get all book function.....................
           useEffect(()=>{
                 dispatch(getAllProduct())    
           },[dispatch,isDepend])


    return (
        <div>
            <div className="flex  gap-x-10 justify-center my-10 ">
                <div>
                    <button className="bg-blue-500 border-b-4 border-amber-400 h-24 text-white px-10 py-2 text-xl rounded-md   font-bold text-center"> Book Product<h1 className="text-4xl">{products.length}</h1></button>
                </div>
                <button onClick={() => setOpenModal(true)} className="bg-amber-400 h-24 border-b-4 border-blue-500  text-white px-10 py-2 text-xl rounded-md flex justify-center items-center font-bold text-center"><img className="h-24 w-24" src={addIcon} alt="" /> Add Book</button>

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto  border-gray-100 my-6">
                    <thead>
                        <tr className=" bg-blue-400 text-white">
                            <th className="py-4 px-2 text-lg text-left border-b">SL No:</th>
                            <th className="py-4 pr-6 text-lg text-left border-b">Book Image</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Book Name</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Description</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === 'pending'? <PageLoader/> :
                          products?.map((p, i) => (
                                <tr key={i} className={` border-b  transition duration-300 ${i % 2 === 0 ? ' bg-amber-50 hover:bg-amber-100' : ' bg-blue-50 hover:bg-blue-100'}`}>
                                    <td className="py-1 px-2 border-b text-xl font-medium">{i + 1}</td>

                                    <td className="py-2 pr-4 flex justify-start">
                                        <img src={p?.image} alt="table navigate ui" className="h-16 w-16 object-cover rounded-md" />
                                    </td>
                                    <td className="py-1 px-6 border-b text-xl font-medium">{p?.name}</td>
                                    <td className="py-1 px-6 border-b text-lg font-medium">{p?.description}</td>
                                    <td className="py-1 px-6 border-b text-end">
                                        <button onClick={() => {setOpenEdit(true);setUpdateData({p})}} className="hover:scale-110 scale-100 transition-all duration-100 px-2 "><img className="h-8 w-8" src={edit} alt="" /></button>
                                        <button onClick={() => { handleDelete(p?._id);
                              }} className="hover:scale-110 scale-100 transition-all duration-100  px-2"><img className="h-8 w-8" src={deleted} alt="" /></button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

            <ProductAddModal setOpenModal={setOpenModal} openModal={openModal} />
            <EditProduct openEdit={openEdit} updateData={updateData} setOpenEdit={setOpenEdit} />

        </div>
    );
};

export default CustomizeProduct;