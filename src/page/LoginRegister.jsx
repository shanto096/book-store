import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bookLoRe from '../assets/group-of-books-on-wooden-planks-background-top-view-royalty-free-image-1680795933.jpg'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth, registerAuth } from "../redux/action/Auth";
import ButtonLoader from "../component/ButtonLoader";
import toast from "react-hot-toast";


const LoginRegister = () => {
    const [registers, setRegister] = useState(false);

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
  const { status, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();

    const user = localStorage.getItem('access-token')

    const onSubmit = (data) => {
        // console.log(data);
        const formData = new FormData();
        formData.append('name', data.userName);
        formData.append('role', data.role);
        formData.append('phone', data.phone);
        formData.append('password', data.passwords);
        formData.append('email', data.email);
        formData.append('avatar', data.userImage[0]);


        dispatch(registerAuth({formData:formData }))
            .then((res) => {
                if (res?.meta?.requestStatus === "fulfilled") {
                    toast.success('Register Successfully')
                    reset()
                    setRegister(false)

                }
                else {
                    toast.error("Something Wrong!")
                    
                }
            })


    }

    const navigate= useNavigate()
    const handleLogin = (event) => {
        event.preventDefault()
        const Data = {
            email: loginEmail,
            password: loginPassword
        }
        dispatch(loginAuth({ Data })).then((result) => {
            
            if (result?.payload) {
              const token = result?.payload?.data?.accessToken;
              const user = result?.payload?.data?.data;
              const userDataJSON = JSON.stringify(user);
              localStorage.setItem("user", userDataJSON);
              localStorage.setItem("access-token", token);
              
            }if (user === "undefined") {
                navigate('/')
            }
            if (user) {
                navigate("/shop");
            }
                
             
    
          });


    }
    return (
        <div className="w-80 md:w-96  lg:w-[800px] mx-auto bg-white flex mt-10 rounded-lg border-b-4 border-amber-400 items-center relative overflow-hidden shadow-xl">
            {/* register form  */}
            <form onSubmit={handleSubmit(onSubmit)} className={`p-8 w-full ${registers ? 'lg:translate-x-0' : 'lg:-translate-x-full hidden lg:block'} duration-500`}>
                <h1 className="backdrop-blur-sm text-2xl font-bold text-blue-500 lg:text-4xl pb-4">Register</h1>
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                    <select id="countries"{...register('role')} className="bg-gray-50 border w-[90%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="user">user</option>
                        <option value="author">author</option>
                    </select>
                    <label htmlFor="name" className="block">Name</label>
                    <input {...register('userName')} id="UserName" type="text" required placeholder="Inter your name" className="p-3 block w-[90%] outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                    <label htmlFor="name" className="block">phone</label>
                    <input {...register('phone')} id="phone" required type="text" placeholder="Inter your number" className="p-3 block w-[90%] outline-none border rounded-md invalid:border-red-700 valid:border-black" />

                    <label htmlFor="u_email" className="block">Email</label>
                    <input {...register('email')} id="email" required type="email" placeholder="Inter your email" className="p-3 block w-[90%] outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                    <label htmlFor="u_password" className="block">Password</label>
                    <input {...register('passwords')} id="password" required type="password" placeholder="password" min={5} className="p-3 block w-[90%] outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                    <input {...register('userImage')} type="file" />
                </div>
                {/* button type will be submit for handling form submission*/}
                <button type="submit" className="py-2 flex justify-center px-7 text-xl mb-4 mx-auto mt-8 shadow-lg font-bold  rounded-md bg-amber-400 hover:bg-blue-500 duration-500 text-white">Submit</button>
                <p className="mb-3 text-center">Already have an account?<Link onClick={() => { setRegister(!registers); }} className="underline font-semibold">Login</Link></p>
                <hr />
            </form>
            {/* img */}
            <div className={`hidden lg:block absolute w-1/2 h-full top-0 z-50 duration-500 overflow-hidden bg-black/20 ${registers ? 'translate-x-full rounded-bl-full duration-500' : 'rounded-br-full'}`}>
                <img src={bookLoRe} className="object-cover h-full" alt="card navigate ui" />
            </div>
            {/* login form */}
            <form onSubmit={handleLogin} className={`p-8 w-full mr-0 ml-auto duration-500 ${registers ? 'lg:translate-x-full hidden lg:block' : ''}`}>
                <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4 font-bold text-blue-500">Login</h1>
                <div className="space-y-5">
                    <label htmlFor="_email" className="block">Email</label>
                    <input onBlur={(e) => { setLoginEmail(e.target.value) }} id="_email" type="email" placeholder="Inter your email" className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                    <label htmlFor="_password" className="block">Password</label>
                    <input onBlur={(e) => { setLoginPassword(e.target.value) }} id="_password" type="password" placeholder="password" min={5} className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                </div>
                {/* button type will be submit for handling form submission*/}
                <button onClick={handleLogin} className="py-2 flex justify-center px-7 text-xl mb-4 mx-auto mt-8 shadow-lg font-bold  rounded-md bg-amber-400 hover:bg-blue-500 duration-500 text-white">{status === 'pending'?<ButtonLoader/>:"Login"}</button>
                <p className="mb-3 text-center">Don&apos;t have an account?<Link onClick={() => { setRegister(!registers); }} className="underline font-semibold">Register</Link></p>
                <hr />
                {error && (
              <div className="text-center my-6">
                <p className="p-4 rounded-xl text-center bg-[#f8d7da] text-[#58151c]">
                  {error}
                </p>
              </div>
            )}
            </form>
           
        </div>
    );
};

export default LoginRegister;