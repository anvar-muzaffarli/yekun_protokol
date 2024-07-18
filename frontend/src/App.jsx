
import './App.css'
import "flowbite"

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

// componentler
import Home from './components/Home'
import Header from './components/layouts/Header'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {

  return (
   <>
   <BrowserRouter>

   <Toaster />
   <Header />
   <Routes>

   <Route path='/register' element={<Register />} />

    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
   
   </Routes>
   </BrowserRouter>
  
   </>
  )
}

export default App
