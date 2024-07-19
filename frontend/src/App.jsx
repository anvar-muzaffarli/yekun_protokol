
import './App.css'
import "flowbite"

import { BrowserRouter, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

// componentler
 import Header from './components/layouts/Header'
//import Home from './components/Home'
//userRoutesun icine yerleshdirdim
// import Login from './components/auth/Login'
// import Register from './components/auth/Register'
import useUserRoutes from './components/routes/userRoutes'
import useAdminRoutes from './components/routes/adminRoutes'

function App() {

  const userRoutes = useUserRoutes()

  const adminRoutes = useAdminRoutes()
  return (
   <>
   <BrowserRouter>

   <Toaster />
   <Header />
   <Routes>

      {userRoutes}
      {adminRoutes}
   
   </Routes>
   </BrowserRouter>
  
   </>
  )
}

export default App
