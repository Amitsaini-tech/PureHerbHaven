import React from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className="mx-5">
            <span className="flex justify-center items-center capitalize text-4xl font-serif  font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-600/50 to-amber-700">shop by category</span>
            <div className="w-full m-10 ">
                < p className="flex items-center justify-center">
                <Link to={"/Naturalb"}>
                    <motion.span whileHover={{ scale: 1.2 }} id='Naturally' className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">
                        natural makeup</motion.span></Link>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">skincare </motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">bath & body</motion.span>
                </p>
                <p className="flex items-center justify-center">
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">haircare</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">pure fragrances </motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">skin</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">hair</motion.span>
                </p>
                <p className="flex items-center justify-center">
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">combo box</motion.span>
                    <motion.span whileHover={{ scale: 1.2 }} className=" flex items-center justify-center w-[15rem] h-10 bg-gray-50/30 shadow-lg drop-shadow-md  rounded-xl m-5 text-lg capitalize font-sans font-medium cursor-pointer hover:bg-rose-400 hover:text-gray-100">mega sale</motion.span>
                </p>
            </div>
        </div>
    )
}

export default Category