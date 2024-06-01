import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/Store.jsx'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
   <Toaster position="top-center" reverseOrder={false} />
   <RouterProvider router={router}/>
   </Provider>
  
  </React.StrictMode>,
)
