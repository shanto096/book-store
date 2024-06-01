import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../redux/slice/BasketSlice";
import { Link } from "react-router-dom";


const Basket = () => {
    
    const {basket}= useSelector((state)=>state.basket)
   

   const dispatch = useDispatch()
    
    
    return (
        <div>
            <div className="flex justify-center">
              {
                basket?.length === 0 ? (<Link to='/shop'><h1 className="text-3xl px-20 my-20 py-5  font-bold bg-amber-400 rounded-lg">Add to cart</h1></Link>) :  (
                    <div className="grid gap-5 grid-cols">
                <div className="bg-gray-250 shadow-xl max-w-[800px] bg-white md:w-[700px] border-b-4 border-amber-400 p-8 sm:my-20 space-y-6">
            
            <hr />
            {/*  Cart  map */}
            {basket?.map((item,i) => (
                <div key={i} className={`flex justify-between items-center pb-6 ${i%2 === 0 ? 'border-b-2 border-amber-400':'border-b-2 border-blue-500'}`}>
                    <div className="flex flex-wrap items-center gap-4">
                        <img className="w-[75px] h-[75px] rounded-lg bg-slate-500" src={item?.image} alt="card navigate ui" />
                        <div>
                            <h5 className="text-lg font-medium">{item?.name}</h5>
                            <p className="text-sm text-gray-400"> {item?.description}</p>
                        </div>
                    </div>
                    {/* item increase decrees  */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-10">
                        <button  onClick={()=>dispatch(removeCart({id:item._id}))} className="text-red-600 font-bold text-xl">X</button>
                    </div>
                </div>
            ))}
            </div>
       
                </div> 
                )
              }
            </div>
        </div>
    );
};

export default Basket;