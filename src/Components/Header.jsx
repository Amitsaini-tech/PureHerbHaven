import React from 'react'

const Header = () => {
  return (
    <div className="w-full h-full md:w-screen md:h-auto">
      {/* laptop & tablets*/}
      <div className="hidden md:flex text-blue-200">
         Header
        </div>
        <div className="flex md:hidden lg:hidden">
         Header2
        </div>
    </div>
  )
}

export default Header