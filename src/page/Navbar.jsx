import { Link, Outlet, useNavigate } from "react-router-dom";
import homeLogo from '../assets/home (1).svg'
import shop from '../assets/bag.svg'

import baskets from '../assets/shop.svg'
import customize from '../assets/customize.svg'
import { useState } from "react";
import { useSelector } from "react-redux";

 

const Navbar = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const navigate = useNavigate()
  const {basket}= useSelector((state)=>state.basket)


  const handleLogOut =()=>{
    localStorage.removeItem('access-token')
    localStorage.removeItem('user')
    navigate('/')
  }
    const users = JSON.parse(localStorage.getItem('user'))
      const {name , email, avatar,role} = users
  
  
    return (

      <>
       
 { role ==='user' || role ==='author' ? <div> <nav className="flex items-center justify-between bg-blue-300 sticky top-0  z-30  px-20 ">
  <div className="text-white text-xl font-semibold hover:scale-110 duration-200 transition-all scale-100 px-3 py-2 rounded-2xl">
  <Link to='/home'> <img className="h-12 w-12" src={homeLogo} alt="" /></Link>
  </div>
 <ul className="flex items-center justify-between gap-6 text-slate-900">

   <Link className="flex items-center px-2 text-xl hover:bg-sky-600 rounded-md" to='/shop'><li className="cursor-pointer    text-white  py-2 px-2  ">  Book</li> <img className="h-8 w-8" src={shop} alt="" /> </Link>
   <Link className="flex items-center px-2 text-xl hover:bg-sky-600 rounded-md" to='/basket'><li className="cursor-pointer    text-white  py-2 px-2  ">  Basket</li> <img className="h-8 w-8" src={baskets} alt="" /> <span className="bg-amber-400 text-center   text-md font-bold px-2 mb-5 rounded-full">{basket.length}</span></Link>
{
  role==='author' && 
  <Link className="flex items-center px- text-xl hover:bg-sky-600 rounded-md" to='/customize-product'><li className="cursor-pointer    text-white  py-2 px-2  ">  Customize Book</li> <img className="h-8 w-8" src={customize} alt="" /></Link>

}  

 <div    onClick={() => setToggleDropDown(!toggleDropDown)}className="flex items-center px-10 text-xl hover:bg-sky-600 rounded-md" > <img
                        src={avatar}
                        alt=""
                        className="h-10 w-10  user cursor-pointer relative object-cover  rounded-full bg-cover bg-center"
                      /><li className="cursor-pointer    text-white  py-2 px-2  "> {name}</li> 
   {toggleDropDown && (
                  <div
                    // ref={dropdownRef}
                    style={{ zIndex: 9999 }}
                    className="drop-down visible  w-72 border-b-4 border-blue-500 overflow-hidden bg-[#ffffff] rounded-md shadow absolute top-14 right-3"
                  >
                    <div className="flex gap-2 p-2">
                      <img
                        src={avatar}
                        alt=""
                        className="h-10 w-10  user cursor-pointer relative object-cover  rounded-full bg-cover bg-center"
                      />
                      <div className="flex  flex-col">
                        <p className="text-[#6B7280] text-sm font-bold">
                          {name}
                        </p>
                        <p className="text-[#6B7280] text-sm font-bold">
                          {email}
                        </p>
                      </div>
                    </div>
                    <ul>

                      <li
                        onClick={handleLogOut}
                        className="px-3 cursor-pointer  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-gray-200"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                        </span>
                        <span> Logout </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
 
  

 </ul>
</nav>
<Outlet/>
</div>:navigate('/')
 
 }
 </>

    );
};

export default Navbar;