import axios from "axios";


 const useAxios = axios.create({
    baseURL:'http://localhost:4000'
})
useAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('access-token')

        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
      }
)
useAxios.interceptors.response.use(
    (response) => {
      return response;
    },
  
    (error) => {
      if (error.response) {
        // if (error.response.status === 401) {
        //   localStorage.clear();
        //   window.location.href = "/";
        // }
      }
  
      return Promise.reject(error?.response?.data?.issue);
    }
  );

  export default useAxios;