import { useNavigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const navigate = useNavigate()

    const token = localStorage.getItem("access-token")
    if (!token) {
        return navigate('/')
    }



    return  children ;
}

export default PrivateRoute;