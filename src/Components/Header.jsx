import React from 'react'
import Instagram from "../image/instagram.png"
import Facebook from "../image/facebook.png"
import Whatsapp from "../image/whatsapp.png"

const Header = () => {
  return (
    <div className="w-full h-full md:w-screen md:h-auto">
      {/* laptop & tablets*/}
      <div className="hidden md:flex text-blue-200 w-full h-auto">
        <div className="flex flex-row items-center justify-center bg-gray-600 w-[24rem] h-[7rem] text-gray-100 text-4xl font-normal"
          style={{
            fontFamily:"Playwrite AU SA,cursive"}}>  PureHerbHaven
      </div>
      <div className=" flex flex-col justify-between  bg-red-500 w-full">
        <div className="flex flex-row items-center justify-between bg-pink-500 w-full h-[3.5rem]">
          <div className="w-full h-auto">
            <span className=" mx-2">+91-7982071088</span>
            <span> sainiamit3464@gmail.com</span>
          </div>
          <div >
            <ul className="flex flex-row ">
              <p className=" flex items-center justify-center w-10 h-10 mx-2 rounded-full"><img src={Instagram} alt="" /></p>
              <p className=" flex items-center justify-center w-10 h-10 mx-2 rounded-full"><img src={Facebook} alt="" /></p>
              <p className=" flex items-center justify-center w-10 h-10 mx-2 rounded-full"><img src={Whatsapp} alt="" /></p>
              <p className=" flex items-center justify-center w-10 h-10 bg-black mx-2 rounded-full">4</p>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between bg-pink-900 w-full h-[3.5rem]">
          icon</div>
      </div>
    </div>
      {/* Mobile */ }
  <div className="flex md:hidden lg:hidden">
    Header2
  </div>
    </div >
  )
}

export default Header