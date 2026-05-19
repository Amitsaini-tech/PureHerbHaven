import React from 'react'
import image1 from "../image/visa.png"
import image2 from "../image/master.png"
import image3 from "../image/rupay.png"
import image4 from "../image/bank_icon.png"
import image5 from "../image/g-pay.png"
import image6 from "../image/paytm.png"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-block mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 font-classic text-3xl font-bold tracking-tight uppercase">
                                PureHerbHaven
                            </span>
                        </Link>
                        <p className="text-gray-600 leading-relaxed mb-4 max-w-md">
                            A line of pure, bespoke and Ayurvedic results-driven skin and hair care made from certified organic and wildcrafted ingredients collected from across India...
                        </p>
                        <Link to="/about" className="text-amber-700 font-medium hover:underline underline-offset-4">Read more</Link>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-gray-900 text-lg font-classic font-semibold uppercase tracking-wider mb-6">Shop</h3>
                        <ul className="space-y-3">
                            {['Skin', 'Hair', 'Bath & Body', 'Natural Makeup', 'Pure Fragrances', 'Festive Giftings'].map(link => (
                                <li key={link}>
                                    <Link to={`/category/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-gray-600 hover:text-amber-700 transition-colors">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Links */}
                    <div>
                        <h3 className="text-gray-900 text-lg font-classic font-semibold uppercase tracking-wider mb-6">About</h3>
                        <ul className="space-y-3">
                            {['Our Story', 'Gifting', 'Ingredients', 'Recycle with us', 'Hotel Partnerships', 'Refer & Earn', 'Loyalty Program'].map(link => (
                                <li key={link}>
                                    <button type="button" className="text-gray-600 hover:text-amber-700 transition-colors bg-transparent border-none p-0 cursor-pointer">
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h3 className="text-gray-900 text-lg font-classic font-semibold uppercase tracking-wider mb-6">Help</h3>
                        <ul className="space-y-3">
                            {['Contact Us', 'Privacy Policy', 'Refund Policy', 'Shipping Policy', 'Terms of Service', 'Track Your Order', 'Affiliate Program'].map(link => (
                                <li key={link}>
                                    <button type="button" className="text-gray-600 hover:text-amber-700 transition-colors bg-transparent border-none p-0 cursor-pointer">
                                        {link}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Newsletter & Payments */}
                <div className="flex flex-col lg:flex-row justify-between items-center py-8 border-t border-gray-200 gap-8">
                    
                    <div className="w-full lg:w-auto max-w-md text-center lg:text-left">
                        <h3 className="text-gray-900 text-lg font-classic font-semibold uppercase tracking-wider mb-2">Stay Updated</h3>
                        <p className="text-gray-600 mb-4">Sign Up for our newsletter to know all about launches & offers!</p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="email" 
                                placeholder="you@example.com" 
                                required
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-3 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-4">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <img src={image1} alt="Visa" className="h-6 w-auto object-contain" />
                            <img src={image2} alt="Mastercard" className="h-8 w-auto object-contain" />
                            <img src={image3} alt="Rupay" className="h-8 w-auto object-contain" />
                            <img src={image4} alt="Net Banking" className="h-6 w-auto object-contain" />
                            <img src={image5} alt="GPay" className="h-6 w-auto object-contain" />
                            <img src={image6} alt="Paytm" className="h-6 w-auto object-contain" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            100% Secure Payments
                        </p>
                    </div>

                </div>
                
                <div className="text-center pt-8 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} PureHerbHaven. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer