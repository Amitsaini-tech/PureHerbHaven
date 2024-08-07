import React, { useEffect, useState } from "react";
import Midcontainer from "./MidContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sandalwood from "../image/Mob_b2g.webp"
import summer from "../image/Web_LG_buy.webp"
import herbal from "../image/b1g1_perfum.webp"
import lipsticks from "../image/web_Lipstick.webp"
import mid_year from "../image/mid_year.webp"
import web_bed from "../image/web_bed.webp"
import { GoArrowLeft, GoArrowRight } from "react-icons/go";



const images = [sandalwood, summer, herbal, lipsticks, mid_year, web_bed]

const Homecontainer = () => {
    const [currentIndex, setcurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setcurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setcurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setcurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="w-full h-full">
            <div className="relative w-full h-[31rem] overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300/30 bg-opacity-50 hover:bg-opacity-100 text-white text-2xl px-4 py-2 rounded-full"
                    onClick={prevSlide}
                >
                    <GoArrowLeft />
                </button>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300/30 bg-opacity-50 hover:bg-opacity-100 text-white text-2xl px-4 py-2 rounded-full"
                    onClick={nextSlide}
                >
                    <GoArrowRight />
                </button>
            </div>
            <Midcontainer/>
        </div>
    );
}
export default Homecontainer;
