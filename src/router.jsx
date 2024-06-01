import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Shop from "./page/Shop";
import LoginRegister from "./page/LoginRegister";
import Basket from "./page/Basket";
import MainLayout from "./MainLayout";
import CustomizeProduct from "./page/CustomizeProduct";
import SingleBook from "./page/SingleBook";
import PrivateRoute from "./priveteRoute/PrivateRoute";



const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginRegister/>,
    },
    
    {
      path: "/",
      element:<MainLayout/>,
      children:[
        {
          path: "/home",
          element: <Home/>,
        },
        {
          path: "/shop",
          element: <PrivateRoute><Shop/></PrivateRoute>,
        },
        {
          path: "/shop/:id",
          element: <SingleBook/>,
        },
        {
          path: "/basket",
          element: <Basket/>,
        },
        {
          path: "/customize-product",
          element: <CustomizeProduct/>,
        },
      ]
    },
   
  ]);

  export default router;