import { Link } from "react-router-dom";
import img from '../assets/undraw_bibliophile-3d4e94b1.svg'

const Home = () => {
    return (
       
           
    <section className="flex min-h-[700px]  w-full items-center justify-center bg-white px-8">
    <div className="flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between">
      <div className="max-w-md md:space-y-6 sm:space-y-5 space-y-4">
        <h1 className="lg:text-3xl sm:text-4xl text-3xl font-bold leading-tight text-gray-900">Embark on a Literary Journey
Explore Worlds, Discover Stories at Our Bookstore!</h1>
        
        <div className="">
          <Link to='/shop'><button className="inline-flex flex-nowrap text-xl items-center justify-center rounded-md  font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-blue-500 h-12 px-12 py-3 bg-amber-400 text-white">
          Start Reading
          </button></Link>
        </div>
       
      </div>
      <div className="relative">  
        <img src={img}  className="relative md:h-[500px]  sm:h-[500px] h-[300px]  w-[500px]  " alt="hero navigate ui"/>
      </div>
    </div>
  </section>       
    
       
    );
};

export default Home;