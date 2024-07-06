import React from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import image1 from "../image/shetty.webp";

const Naturalb = () => {
    return (
        <div className="w-full h-full mt-12 overflow-hidden">
            <div>
                <img src={image1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full flex flex-row">
                <div className="w-[25rem] h-full flex flex-col items-start justify-start my-10 mx-5">
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">categories</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">finish</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">coverage</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">skin tone</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">formulation</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">skintype</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                    <p className="text-2xl flex items-center justify-between w-full capitalize my-5">
                        <span className="mx-2">preference</span>
                        <span className="mx-2"><MdOutlineKeyboardArrowDown /></span>
                    </p>
                </div>
                <div className="w-full h-full my-10 mx-3 flex">
                    <div className="w-[15rem]  h-[23rem] flex flex-col items-center justify-start m-2">
                        <img src={image1} className="w-[15rem] h-[15rem]" alt="" />
                        <span className="text-md font-light my-2 capitalize">title</span>
                        <span className="text-[12px] font-normal text-orange-700 capitalize">Highlight</span>
                        <span className="text-lg font-mono my-2">Price</span>
                        <button
                            type="button"
                            className="w-[15rem] bg-red-200 hover:bg-red-300 h-10 font-mono"
                        >
                            Add to cart
                        </button>
                    </div>
                    
                    

                </div>
            </div>
        </div>
    );
}

export default Naturalb;
