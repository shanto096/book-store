import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProduct } from "../redux/action/Products";
import { addReview } from "../redux/action/Rating";
import moment from "moment";
import { cart } from "../redux/slice/BasketSlice";
import PageLoader from "../component/PageLoader";

const SingleBook = () => {
    const { singleProductData, status } = useSelector((state) => state.products)
    const { id } = useParams()
    const dispatch = useDispatch()
    const[reload , setReload] =useState(false)

    useEffect(() => {
        if (id) {
            dispatch(singleProduct({ id: id }))
           

        }
    }, [dispatch, id,reload])
  

   

    const [rating, setRating] = useState(0)

    const ratingChanged = (newRating) => {
        setRating(newRating);
      };



    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
       

        const Data = {
            review: data.reviews,
            rating: rating
        }
       console.log(id);
        console.log(Data);
        dispatch(addReview({Data:Data,id}))
        .then((res)=>{
            if (res) {
                setReload(!reload)
            }
        })
    
        

     
    }
    if (status === 'pending') {
        return <PageLoader/>
    }
    return (
        <div>
            <div className="flex justify-center py-10 px-20 ">
                <div className="grid gap-10 grid-cols-2">
                    <div>
                        <div className={`max-w-full space-y-4 rounded-lg border-b-4  p-10 shadow-lg  bg-whit`}>
                                        <div >
                                        <img alt="card navigate ui" className="w-[350px] h-[275px] object-cover  rounded-lg " src={singleProductData?.book?.image} />
                                        <div className="grid gap-2">
                                            <h1 className="text-lg font-semibold ">{singleProductData?.book?.name}</h1>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{singleProductData?.book?.description}</p>
                                            <ReactStars
                                                value={singleProduct?.book?.rating}
                                                edit={false}
                                                size={50}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <div className="flex justify-center ">

                                            <button  onClick={()=>dispatch(cart(singleProductData?.book))} className="px-3 py-2 bg-amber-400 text-white rounded-lg font-semibold md:text-base sm:text-sm text-[12px] hover:bg-blue-500">Add to Cart</button>

                                        </div>
                                    </div>

                            {/* divider  */}
                            <div className="my-8 flex items-center px-8">
                                <hr className="flex-1" />
                                <div className="mx-4 text-gray-400">OR</div>
                                <hr className="flex-1" />
                            </div>
                            {
                                singleProductData?.reviews?.map((r, i) => (
                                    <div key={i} className="p-3">
                                        <div className="flex gap-3 items-center">
                                            <img src={r?.user?.avatar}
                                                className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
                                            <h3 className="font-bold">
                                                {r?.user?.name}
                                                <br />
                                                <span className="text-sm text-gray-400 font-normal">{moment(r.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mt-2 ml-10">
                                            {r.review}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* input side  */}
                    <div className="  bg-white   ">
                        <div className="space-y-2  rounded-lg border-b-4  p-10 shadow-lg  bg-whit">
                            <h2 className="pb-2 text-center text-3xl font-bold text-[#8EA7E9]">Review Here</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex  w-full flex-col items-center justify-center gap-4">
                                <textarea {...register("reviews")} className="w-full h-20 rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 " type="text" placeholder="Review" />

                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={50}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                <input className="w-full rounded-lg bg-blue-500 px-6 py-2 font-medium text-white " type="submit" />

                            </form>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;