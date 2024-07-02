import React from 'react'
import { motion } from "framer-motion"

const Category = () => {
    return (
        <div className="mx-5">
            <span className=" flex justify-center items-center capitalize text-4xl font-serif  font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-600/50 to-amber-700">shop by category</span>
            <div className="w-full mt-10 ">
                < p className="flex items-center justify-center">
                    <motion.span whileHover={{ scale: 1.2 }}  className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">
                    natural makeup</motion.span>
                    <motion.span  whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">skincare </motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">bath & body</motion.span>
                </p>
                <p className="flex items-center justify-center">
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">haircare</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">pure fragrances </motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">skin</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">hair</motion.span>
                </p>
                <p className="flex items-center justify-center">
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">combo box</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer">mega sale</motion.span>
                </p>
            </div>
        </div>
    )
}

export default Category