import React from 'react'
import { IoIosSearch } from "react-icons/io";
import user from "../image/user.png"
import { MdShoppingBasket } from 'react-icons/md';


const Header = () => {
  return (
    <div className=" w-full h-full z-10">
      {/* laptop & tablets*/}
      <div className="hidden md:flex w-full h-auto bg-white">
        <div>
        </div>

        <div className="fixed w-full flex flex-row items-center justify-between bg-white">
          <p className="  bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-700 font-classic text-[2.3rem] font-semibold">PureHerbHaven</p>
          {/* first */}
          <div className="flex flex-row items-center justify-center bg-white w-full h-full ">
            <ul className="flex flex-row items-center justify-center">
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">Skin</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">Hair</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">Bath & body</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">Natural makeup</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">pure fragrances</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">offers</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">gifting</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">build a box</li>
              <li className=" flex items-center text-black font-sans font-medium hover:text-green-300 cursor-pointer uppercase h-10 mx-2">beauty sale</li>
            </ul>
            
          </div>
          {/* second */}
          <div className="flex flex-row bg-white ">
              <p className=" flex items-center justify-center w-10 h-10 mx-2 rounded-full">
                <IoIosSearch className=" w-10 h-6 text-black" />
              </p>
              <p className=" flex items-center justify-center w-10 h-10 mx-2 bg-white rounded-full">
                <MdShoppingBasket className=" w-10 h-6 text-black" />
              </p>
              <p className=" flex items-center justify-center w-10 h-10 ml-5 mr-2 rounded-full">
                <img src={user} alt="" />
              </p>
            </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden lg:hidden">
        Header2
      </div>
    </div >
  )
}



export default Header