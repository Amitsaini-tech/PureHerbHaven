import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Footer from './Footer';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Address form state
    const [addressData, setAddressData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prev => ({ ...prev, [name]: value }));
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 999 ? 0 : 50;
    const total = subtotal + shipping;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const orderId = `ORD-${Math.floor(Math.random() * 1000000000)}`;
        const sellerIds = [...new Set(cartItems.map(item => item.sellerId).filter(Boolean))];

        try {
            // Save order to Firestore
            await addDoc(collection(db, "orders"), {
                orderId,
                userId: user.uid,
                userEmail: user.email,
                items: cartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.Price,
                    imgsrc: item.imgsrc,
                    quantity: item.quantity,
                    sellerId: item.sellerId || null
                })),
                sellerIds,
                subtotal,
                shipping,
                total,
                paymentMethod,
                shippingAddress: addressData,
                status: 'Confirmed',
                createdAt: serverTimestamp()
            });

            clearCart();
            setIsProcessing(false);
            navigate('/success', { state: { orderId } });
        } catch (error) {
            console.error("Error saving order: ", error);
            alert("Failed to process order. Please try again.");
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen pt-24 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <button onClick={() => navigate('/')} className="bg-amber-800 text-white px-6 py-2 rounded">
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen pt-24 bg-gray-50 flex flex-col">
            <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col lg:flex-row gap-8">

                {/* Left Column: Forms */}
                <div className="flex-1">
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-classic font-semibold mb-6">Delivery Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" required name="fullName" value={addressData.fullName} onChange={handleAddressChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500 bg-white" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input type="text" required name="address" value={addressData.address} onChange={handleAddressChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500 bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input type="text" required name="city" value={addressData.city} onChange={handleAddressChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500 bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input type="text" required name="postalCode" value={addressData.postalCode} onChange={handleAddressChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500 bg-white" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" required name="phone" value={addressData.phone} onChange={handleAddressChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500 bg-white" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-classic font-semibold mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <label className={`block border p-4 rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-amber-600 focus:ring-amber-500" />
                                        <span className="ml-3 font-medium">Credit / Debit Card</span>
                                    </div>
                                    {paymentMethod === 'card' && (
                                        <div className="mt-4 space-y-4">
                                            <input type="text" placeholder="Card Number" className="w-full px-4 py-2 border border-gray-300 rounded text-sm" />
                                            <div className="flex gap-4">
                                                <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-2 border border-gray-300 rounded text-sm" />
                                                <input type="text" placeholder="CVC" className="w-1/2 px-4 py-2 border border-gray-300 rounded text-sm" />
                                            </div>
                                        </div>
                                    )}
                                </label>

                                <label className={`block border p-4 rounded-lg cursor-pointer transition ${paymentMethod === 'upi' ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="text-amber-600 focus:ring-amber-500" />
                                        <span className="ml-3 font-medium">UPI / Net Banking</span>
                                    </div>
                                    {paymentMethod === 'upi' && (
                                        <div className="mt-4">
                                            <input type="text" placeholder="Enter UPI ID (e.g., name@okbank)" className="w-full px-4 py-2 border border-gray-300 rounded text-sm" />
                                        </div>
                                    )}
                                </label>

                                <label className={`block border p-4 rounded-lg cursor-pointer transition ${paymentMethod === 'cod' ? 'border-amber-600 bg-amber-50' : 'border-gray-200'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="text-amber-600 focus:ring-amber-500" />
                                        <span className="ml-3 font-medium">Cash on Delivery</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-[400px]">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-classic font-semibold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative">
                                        <img src={item.imgsrc} alt={item.title} className="w-16 h-16 object-cover rounded border" />
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.Price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-lg font-medium text-lg text-white transition-colors ${isProcessing ? 'bg-amber-600 cursor-wait' : 'bg-amber-800 hover:bg-amber-900'}`}
                        >
                            {isProcessing ? 'Processing Order...' : `Pay ₹${total.toFixed(2)}`}
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
