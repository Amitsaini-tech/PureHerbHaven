import React from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import image1 from "../image/shetty.webp";
import { list } from '../utils/data';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer'

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
                <div className="w-full h-full my-10 mx-3 grid grid-rows-2 grid-cols-4 gap-8">
                    {list && list.map((n)=>(
                      <div key={n.id} className="w-[17rem]  h-[22rem] flex flex-col items-center justify-start m-2">
                        <img src={n.imgsrc} className="w-[16rem] h-[17rem]" alt="" />
                        <span className="text-sm font-light my-2 capitalize">{n.title}</span>
                        <span className="text-[10px] font-normal text-orange-700 capitalize">{n.Highlight}</span>
                        <span className="text-lg font-mono my-2">{n.Price}</span>
                       <Link to={n.path} ><button
                            type="button"
                            className="w-[15rem] bg-red-200 hover:bg-red-300 h-10 font-mono"
                        >
                            Add to cart
                        </button></Link> 
                    </div>  
                    ))}
                    
                    
                    

                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Naturalb;
