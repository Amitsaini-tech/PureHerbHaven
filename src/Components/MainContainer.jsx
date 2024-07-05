import React from 'react'
import Homecontainer from './Homecontainer'
import Category from './category'
import Mid2Container from './Mid2Container'
import Footer from './Footer'


const MainContainer = () => {
  return (
    <div className="mt-16">
      <Homecontainer/>
      <Category/>
      <Mid2Container/>
      <Footer/>
    </div>
  )
}

export default MainContainer