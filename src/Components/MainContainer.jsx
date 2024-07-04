import React from 'react'
import Homecontainer from './Homecontainer'
import Category from './category'
import Mid2Container from './Mid2Container'


const MainContainer = () => {
  return (
    <div className="mt-16">
      <Homecontainer/>
      <Category/>
      <Mid2Container/>
    </div>
  )
}

export default MainContainer