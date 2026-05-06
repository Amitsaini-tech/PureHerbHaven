
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from './Footer';

const OrderSuccess = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || `ORD-${Math.floor(Math.random() * 1000000000)}`;

    return (
        <div className="w-full min-h-screen pt-24 bg-gray-50 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-lg w-full text-center border border-gray-100">
                    <BsCheckCircleFill className="text-6xl text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-classic font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-8 text-lg">Thank you for shopping with PureHerbHaven.</p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Order Reference ID</p>
                        <p className="text-xl font-mono font-semibold text-gray-800">{orderId}</p>
                        <p className="text-sm text-gray-500 mt-4">We've sent a confirmation email with order details and a tracking link.</p>
                    </div>

                    <Link
                        to="/"
                        className="inline-block w-full py-4 bg-amber-800 text-white rounded-lg font-medium text-lg hover:bg-amber-900 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
