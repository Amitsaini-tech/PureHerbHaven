import React from 'react'
import MainContainer from "./Components/MainContainer"
import { Route, Routes, useLocation } from 'react-router-dom'
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
import ProductUpload from './Components/Seller/ProductUpload'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AdminEditProduct from './Components/Admin/AdminEditProduct'
import { ProtectedRoute, AdminRoute, SellerRoute, DeliveryRoute } from './Components/Auth/Routes'
import Profile from './Components/Profile'
import Orders from './Components/Orders'
import SellerPanel from './Components/Seller/SellerPanel'
import DeliveryDashboard from './Components/Delivery/DeliveryDashboard'
import DeliveryLogin from './Components/Delivery/DeliveryLogin'
import DeliveryLanding from './Components/Delivery/DeliveryLanding'
import DeliverySignup from './Components/Delivery/DeliverySignup'

const App = () => {
  const location = useLocation();
  const isDeliveryApp = location.pathname === '/delivery';

  return (
    <AuthProvider>
      <CartProvider>
        <div className={`w-screen min-h-screen flex flex-col relative ${!isDeliveryApp ? 'pt-[36px]' : ''}`}>
          {!isDeliveryApp && (
            <>
              <TopMarquee />
              <Header />
              <CartDrawer />
            </>
          )}
          <main className={`flex-1 w-full ${!isDeliveryApp ? 'mt-12' : ''}`}>
            <Routes>
              <Route path='/*' element={<MainContainer />} />
              <Route path='/category/:categoryName' element={<CategoryPage />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
               <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path='/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path='/admin/edit-product/:id' element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
              <Route path='/seller' element={<SellerRoute><SellerPanel /></SellerRoute>} />
              <Route path='/seller/upload-product' element={<SellerRoute><ProductUpload /></SellerRoute>} />
              <Route path='/deliver' element={<DeliveryLanding />} />
              <Route path='/deliver/signup' element={<DeliverySignup />} />
              <Route path='/deliver/login' element={<DeliveryLogin />} />
              <Route path='/delivery' element={<DeliveryRoute><DeliveryDashboard /></DeliveryRoute>} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App