
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/action/Products";
import toast from "react-hot-toast";
import ButtonLoader from "./ButtonLoader";




// eslint-disable-next-line react/prop-types
const EditProduct =({ setOpenEdit, openEdit, updateData }) => {
    console.log(updateData?.p);
    // const [image, setImage] = useState(openEditData?.image);
  
    
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData()
        formData.append('name',data.bookName)
        formData.append('description',data.descriptions)
        formData.append('image',data.bookImage[0])

            dispatch(updateProduct({formData:formData, id :updateData?.p?._id }))
            .then((res) => {
                if (res?.meta?.requestStatus === "fulfilled") {
                    toast.success('Successfully Update Book')
                    reset()
                    setOpenEdit(!openEdit)
                 }
                else {
                    toast.error('This is an error!');
                }
            })
    }
    return (
        <div onClick={() => setOpenEdit(false)} className={`fixed flex justify-center items-center z-[100] ${openEdit ? 'visible opacity-1' : 'invisible opacity-0'} inset-0 w-full h-full backdrop-blur-sm bg-black/20 duration-100`}>
            <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full lg:w-[500px] bg-white border-b-4 border-blue-500 drop-shadow-2xl rounded-lg ${openEdit ? 'opacity-1 duration-300 translate-y-0' : '-translate-y-20 opacity-0 duration-150'}`}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-12">
                    <svg onClick={() => setOpenEdit(false)} className="w-10 mx-auto mr-0 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#000000"></path></g></svg>
                    <h1 className="backdrop-blur-sm text-4xl pb-3">Update Product</h1>
                    <div className="space-y-3">
                        <label className="block">Book name</label>
                        <div className="relative">
                            <input {...register('bookName')} id="name" type="text" defaultValue={updateData?.p?.name} className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                        </div>
                        <label className="block">Price</label>
                        <div className="relative">
                            <input {...register('descriptions')} id="name" type="text" defaultValue={updateData?.p?.description} className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none" />
                        </div>
                        <label className="block">Book Photo</label>
                       <input {...register("bookImage")} 
                       defaultValue={updateData?.p?.image}
                    //    onChange={(e) => setImage(e.target.files[0])}
                       type="file" />
                    </div>
                    {/* button type will be submit for handling form submission*/}
                    <div className="flex justify-center"> 
                    <button type="submit" className="py-2 px-10 text-white font-bold text-xl mb-4 mt-6 shadow-lg flex ju rounded-lg before:block before:-left-1 before:-top-1 before:bg-blue-500 before:rounded-lg before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%]  before:duration-500 before:-z-40 after:block after:-right-1 after:-bottom-1 after:bg-blue-500 after:rounded-lg after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-amber-400 relative inline-block">{status === 'pending'?<ButtonLoader/>:"Submit"}</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;