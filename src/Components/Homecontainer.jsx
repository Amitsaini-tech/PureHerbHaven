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

const images = [sandalwood, summer, herbal, lipsticks, mid_year, web_bed];

const Homecontainer = () => {
    const [currentIndex, setcurrentIndex] = useState(0);

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
            {/* Slider */}
            <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[75vh] xl:h-[85vh] overflow-hidden group">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover object-center md:object-top lg:object-center" />
                    </div>
                ))}
                
                {/* Navigation Buttons - Visible on Hover for Desktop */}
                <button
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white text-xl md:text-2xl p-2 md:p-3 rounded-full opacity-0 md:group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                    onClick={prevSlide}
                >
                    <GoArrowLeft />
                </button>
                <button
                    className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white text-xl md:text-2xl p-2 md:p-3 rounded-full opacity-0 md:group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                    onClick={nextSlide}
                >
                    <GoArrowRight />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setcurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </div>
            
            <Midcontainer />
        </div>
    );
}

export default Homecontainer;
