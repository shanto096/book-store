import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, searchProduct } from "../redux/action/Products";
import { cart } from "../redux/slice/BasketSlice";
import PageLoader from "../component/PageLoader";

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { products, status, searchProducts } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const handleSubmit = () => {
        if (searchTerm.trim() === '') {
            dispatch(getAllProduct());
        } else {
            const name = { name: searchTerm };
            dispatch(searchProduct(name))
                .then((res) => {
                    if (res.length === 0) {
                        dispatch(getAllProduct());
                    }
                })
                .catch((error) => {
                    console.error("Error searching for product:", error);
                });
        }
    };

    return (
        <div className="flex justify-center py-10">
            <div>
                <div className="flex gap-4 justify-center">
                    <input onBlur={(e) => setSearchTerm(e.target.value)} className="peer rounded-lg border w-[50%] border-[#1B8EF8] px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="Search Book" />
                    <button onClick={handleSubmit} className="px-5 py-2 bg-amber-400 hover:bg-blue-500 hover:text-white duration-300 rounded-md">Search</button>
                </div>
                <div className="grid gap-10 sm:grid-cols-3">
                    {status === 'pending' ? <PageLoader /> :
                        (searchTerm.trim() === '' ? products : searchProducts)?.map((p, i) => (
                            <div key={i} className={`max-w-[400px] space-y-4 rounded-lg border-b-4  p-10 shadow-lg md:w-[350px]  bg-white${i % 2 === 0 ? 'border-b-4 border-amber-400' : 'border-b-4 border-blue-500'}`}>
                                <img alt="card navigate ui" className="w-[350px] h-[275px] object-cover  rounded-lg " src={p.image} />
                                <div className="grid gap-2">
                                    <h1 className="text-lg font-semibold ">{p.name}</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{p.description}</p>
                                    <ReactStars
                                        value={p.rating}
                                        edit={false}
                                        size={50}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => { dispatch(cart(p)) }} className="px-3 py-2 bg-amber-400 text-white rounded-lg font-semibold md:text-base sm:text-sm text-[12px] hover:bg-blue-500">Add to Cart</button>
                                    <Link to={`/shop/${p._id}`}>
                                        <button className="px-3 py-2 bg-white hover:bg-blue-500 hover:text-white border-blue-400 border duration-300 rounded-md">View details</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;
