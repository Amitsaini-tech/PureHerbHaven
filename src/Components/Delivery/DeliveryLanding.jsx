import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { MdOutlineLocalShipping, MdAttachMoney, MdSchedule } from 'react-icons/md';

const DeliveryLanding = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50 pt-20 flex flex-col">
            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-classic font-bold mb-6">
                        Drive with PureHerbHaven
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join our delivery network and earn on your own schedule. Deliver premium herbal products to happy customers.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/deliver/signup"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-md font-bold text-lg transition-colors shadow-lg"
                        >
                            Apply Now
                        </Link>
                        <Link 
                            to="/deliver/login"
                            className="bg-transparent hover:bg-blue-800 text-white border-2 border-white px-8 py-3 rounded-md font-bold text-lg transition-colors"
                        >
                            Partner Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-classic font-bold text-center text-gray-900 mb-16">
                    Why Deliver With Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MdAttachMoney className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Competitive Earnings</h3>
                        <p className="text-gray-600">
                            Earn market-standard rates per delivery, plus incentives for peak hours and long distances.
                        </p>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MdSchedule className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
                        <p className="text-gray-600">
                            Be your own boss. Log in when you want to work, and log off when you're done.
                        </p>
                    </div>
                    
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MdOutlineLocalShipping className="text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Easy Process</h3>
                        <p className="text-gray-600">
                            Our streamlined app makes picking up and dropping off orders simple and efficient.
                        </p>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <div className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100 flex-1">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-classic font-bold text-gray-900 mb-10">
                        How It Works
                    </h2>
                    <div className="space-y-8 text-left">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">Sign Up Online</h4>
                                <p className="text-gray-600 mt-1">Submit your basic details to create your partner account.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">Get Approved</h4>
                                <p className="text-gray-600 mt-1">We'll review your application and activate your account quickly.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">Start Earning</h4>
                                <p className="text-gray-600 mt-1">Log in to the delivery dashboard, accept orders, and get paid.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DeliveryLanding;
