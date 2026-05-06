import React from 'react';
import { motion } from "framer-motion";

const TopMarquee = () => {
    return (
        <div className="w-full bg-amber-800 text-white py-2 overflow-hidden flex whitespace-nowrap fixed top-0 z-40">
            <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="flex items-center space-x-8 px-4"
            >
                {[...Array(3)].map((_, i) => (
                    <span key={i} className="text-sm font-medium tracking-widest uppercase flex items-center space-x-8">
                        <span>✨ Free Shipping on orders over ₹999</span>
                        <span>🌿 100% Vegan & Cruelty Free</span>
                        <span>🎉 Get 20% off your first order with code WELCOME20</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default TopMarquee;
