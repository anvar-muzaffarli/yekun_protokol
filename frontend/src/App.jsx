
import './App.css'
import "flowbite"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'

import { Toaster } from 'react-hot-toast'

import Home from './components/Home'
import Header from './components/layouts/Header'

function App() {

  return (
   <>
   <BrowserRouter>

   <Toaster />
   <Header />
   <Routes>

    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
   </Routes>
   </BrowserRouter>
  
   </>
  )
}

export default App
