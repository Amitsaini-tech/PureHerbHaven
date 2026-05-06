import React from 'react'
import MainContainer from "./Components/MainContainer"
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import CategoryPage from './categories/CategoryPage'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import ProductDetail from './Components/ProductDetail'
import CartDrawer from './Components/CartDrawer'
import Checkout from './Components/Checkout'
import OrderSuccess from './Components/OrderSuccess'
import TopMarquee from './Components/TopMarquee'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import ProductUpload from './Components/Admin/ProductUpload'
import AdminDashboard from './Components/Admin/AdminDashboard'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="w-screen min-h-screen flex flex-col relative pt-[36px]">
          <TopMarquee />
          <Header />
          <CartDrawer />
          <main className="flex-1 w-full mt-12">
            <Routes>
              <Route path='/*' element={<MainContainer />} />
              <Route path='/category/:categoryName' element={<CategoryPage />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/success' element={<OrderSuccess />} />
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/admin/upload-product' element={<ProductUpload />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App