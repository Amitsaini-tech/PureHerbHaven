import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-classic font-semibold">Your Cart ({cartItems.length})</h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoMdClose className="text-2xl" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                    <p className="text-lg">Your cart is empty.</p>
                                    <button onClick={() => setIsCartOpen(false)} className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 border-b pb-4">
                                        <img src={item.imgsrc} alt={item.title} className="w-20 h-24 object-cover rounded" />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                                                <p className="text-sm text-gray-500">{item.Price}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border rounded">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                                                    <span className="px-4 text-sm">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t bg-gray-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-medium text-lg">Subtotal</span>
                                    <span className="font-semibold text-lg">₹{getCartTotal().toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
                                <Link 
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full flex justify-center items-center py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
                                >
                                    Checkout
                                </Link>
                                <button onClick={clearCart} className="w-full py-2 mt-2 text-sm text-gray-600 hover:text-black">
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
