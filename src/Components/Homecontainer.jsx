import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sandalwood from "../image/sandalwood.avif"
import summer from "../image/herbal summer.jpg"
import herbal from "../image/herbal-products.jpg"
import lipsticks from "../image/lipsticks.webp"

export default function Homecontainer() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div>
        <Slider {...settings} className="  flex items-center justify-center mx-[4rem]">
            
            <div>
                <h3><img src={sandalwood} alt=""  className=" w-full h-[20rem] px-5"/></h3>
            </div>
            <div>
                <h3><img src={summer} alt=""  className=" w-full h-[20rem] px-5"/></h3>
            </div>
            <div>
                <h3><img src={herbal} alt=""  className=" w-full h-[20rem] px-5"/></h3>
            </div>
            <div>
                <h3><img src={lipsticks} alt=""  className=" w-full h-[20rem] px-5"/></h3>
            </div>
            <div>
                <h3><img src={summer} alt=""  className=" w-full h-[20rem] px-5"/></h3>
            </div>
            <div>
                <h3><img src={summer} alt=""  className=" w-full h-[20rem] px-5"/></h3>
            </div>
        </Slider>
        
        </div>
    );
}
