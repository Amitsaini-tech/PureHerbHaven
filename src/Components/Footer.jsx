import React from 'react'
import image1 from "../image/visa.png"
import image2 from "../image/master.png"
import image3 from "../image/rupay.png"
import image4 from "../image/bank_icon.png"
import image5 from "../image/g-pay.png"
import image6 from "../image/paytm.png"

const Footer = () => {
    return (
        <div className="w-full h-auto ">
            <div className="flex items-center justify-evenly px-6 mx-3">
                <ul className=" w-[15rem] h-[22rem]">
                    <p className="text-black text-2xl uppercase my-5">PureHerbHaven</p>
                    <p className="text-md text-gray-600">A line of pure, bespoke and Ayurvedic results-driven skin and hair care made from certified organic and wildcrafted ingredients collected from across India...<span className="underline">read more</span>
                    </p>
                </ul>
                <ul className="h-[22rem] w-[15rem] flex flex-col items-start justify-start">
                    <p className="text-black text-2xl uppercase my-5">shop</p>
                    <li className="text-gray-600 my-2">Skin</li>
                    <li className="text-gray-600 my-2">Hair</li>
                    <li className="text-gray-600 my-2">bath & body</li>
                    <li className="text-gray-600 my-2">natural makeup</li>
                    <li className="text-gray-600 my-2">pure fragrances</li>
                    <li className="text-gray-600 my-2">festive giftings</li>
                </ul>
                <ul className="h-[22rem] w-[15rem] flex flex-col items-start justify-start">
                    <p className="text-black text-2xl uppercase my-5">About</p>
                    <li className="text-gray-600 my-2">our story</li>
                    <li className="text-gray-600 my-2">gifting</li>
                    <li className="text-gray-600 my-2">ingredients</li>
                    <li className="text-gray-600 my-2">recycle with PureHerbHaven</li>
                    <li className="text-gray-600 my-2">hotel partnerships</li>
                    <li className="text-gray-600 my-2">refer and earn</li>
                    <li className="text-gray-600 my-2">loyalty program</li>
                </ul>
                <ul className="h-[22rem] w-[15rem] flex flex-col items-start justify-start">
                    <p className="text-black text-2xl uppercase my-5">help</p>
                    <li className="text-gray-600 my-2">contact us </li>
                    <li className="text-gray-600 my-2">privacy policy</li>
                    <li className="text-gray-600 my-2">refund policy</li>
                    <li className="text-gray-600 my-2">shipping policy</li>
                    <li className="text-gray-600 my-2">terms of service</li>
                    <li className="text-gray-600 my-2">track your order</li>
                    <li className="text-gray-600 my-2">affiliate program</li>
                </ul>
                <ul className="h-[22rem] w-[15rem] flex flex-col items-start justify-start">
                    <p className="text-black text-2xl uppercase my-5">stay updated</p>
                    <li className="text-gray-600 my-2 text-lg">Sign Up for our newsletter to know all about launches & offers!</li>
                    <input type="email" name="" id="" placeholder="you@example.com" className="w-64 h-12 rounded-3xl border border-black bg-transparent px-2" />
                    <button type="submit" className="w-64 h-12 rounded-3xl border bg-rose-200 px-2 text-gray-700 text-lg my-3">subscribe</button>
                </ul>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-center gap-4">
                    <img src={image1} alt="" className=" w-14 h-8" />
                    <img src={image2} alt="" className=" w-16 h-10" />
                    <img src={image3} alt="" className=" w-16 h-10" />
                    <img src={image4} alt="" className=" w-10 h-8" />
                    <img src={image5} alt="" className=" w-14 h-8" />
                    <img src={image6} alt="" className=" w-14 h-8" />
                </div>
                <p className="flex items-center justify-center my-2">100% secure payments</p>
            </div>
        </div>
    )
}

export default Footer