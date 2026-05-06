import React from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

const Category = () => {
    const categories = [
        { name: "natural makeup", path: "/category/natural-makeup" },
        { name: "skincare", path: "/category/skincare" },
        { name: "bath & body", path: "/category/bath-body" },
        { name: "haircare", path: "/category/haircare" },
        { name: "pure fragrances", path: "/category/pure-fragrances" },
        { name: "combo box", path: "/category/combo-box" },
        { name: "mega sale", path: "/category/mega-sale" },
        { name: "shop all", path: "/category/shop-all" }
    ];

    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <span className="capitalize text-3xl md:text-4xl font-classic font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-900">
                    Shop by Category
                </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {categories.map((cat, index) => (
                    <Link key={index} to={cat.path} className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] md:w-[calc(25%-2rem)] lg:w-[calc(20%-2.5rem)]">
                        <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-16 sm:h-20 bg-amber-50 shadow-sm border border-amber-100 rounded-xl flex items-center justify-center text-sm sm:text-base capitalize font-sans font-medium cursor-pointer hover:bg-amber-700 hover:text-white transition-colors duration-300 px-2 text-center text-amber-900"
                        >
                            {cat.name}
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Category