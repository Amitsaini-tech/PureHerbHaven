import React, { useState } from 'react'
import image1 from "../image/star circle.webp"
import image2 from "../image/TP_MP.webp"
import image3 from "../image/Crowd_Source.webp"
import { IoBulbOutline, IoTelescopeOutline } from "react-icons/io5";
import { theme } from '../utils/data';

const Mid2Container = () => {
    const [selectedSub, setSelectedSub] = useState(theme[0].sub);

    const handleSubClick = (sub) => {
        setSelectedSub(sub);
    };
    return (
        <div className="w-full">
            <div className="w-full h-96 bg-transparent bg-gradient-to-r from-blue-400 to-blue-300 flex flex-col justify-center items-center gap-2">
                <span className=" font-classic font-medium  text-4xl">WE EMBODY</span>
                <p className="w-[75rem] text-xl font-mono my-3">Transparency is in our DNA. That's why our formulas were developed exactly the way you'd expect: science backed, vegan and cruelty free! Designed for common skin needs in mind - the all-in-one solution</p>
                <img src={image1} alt="" className="w-32 my-5" />
                <img src={image2} alt="" className="my-5" />
            </div>
            <div style={{ background: "#FCD0C8" }} className="w-full h-96 flex flex-row justify-center items-center gap-2">
                <img src={image3} alt="" className="my-5 w-[50%] h-96" />
                <div className="w-[50%] flex flex-col justify-center items-center ">
                    <span className=" font-classic font-medium  text-4xl">THE JH COLLECTIVE</span>
                    <span className=" text-lg  my-3 font-classic font-black ">Our products are developed with insights from our most loyal customers.</span>
                    <p className=" text-[1.2rem] text-center ">Join us on our mission to create proven solutions that go deeper than just the surface.</p>
                    <div className="flex flex-row mt-16 ">
                        <p className="w-[7rem] text-center items-center  underline uppercase mx-10"><IoTelescopeOutline className="w-[7rem] text-5xl mx-2 text-center" />CROWDSOURCED CREATIONS</p>
                        <p className="w-[7rem] text-center  underline uppercase"><IoBulbOutline className="w-[7rem] text-5xl " />share an idea</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[25rem] bg-transparent bg-gradient-to-r from-blue-400 to-blue-300 flex flex-col justify-center items-center">
                <div className=" w-[50rem] flex flex-row flex-wrap items-center justify-center">
                    {theme
                        .filter((category) => category.sub === selectedSub)
                        .flatMap((category) => category.posts)
                        .map((post) => (
                            <div
                                key={post.id}
                                className=" w-[full] flex items-center justify-center m-2"
                            >
                                <span className="text-2xl font-semibold text-center font-classic my-2 capitalize">{post.title}</span>
                            </div>
                        ))}
                </div>
                <div className="grid grid-cols-5 ">
                    {theme.map(({ sub }) => (
                        <div
                            key={sub}
                            className="w-full flex items-center justify-center my-5 py-3 px-5 cursor-pointer"
                            onClick={() => handleSubClick(sub)}
                        >
                            <img src={sub} alt="" className="hover:border-b w-[10rem]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Mid2Container