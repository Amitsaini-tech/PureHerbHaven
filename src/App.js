import React from 'react'
import MainContainer from "./Components/MainContainer"
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Naturalb from './Components/Naturalb'
const App = () => {
  return (
    <div className="w-screen h-full flex flex-col">
      <Header/>
      <main className=" h-full mt-8 md:mt-12 lg:mt-1 w-full">
        <Routes>
          <Route path='/*' element={<MainContainer />} />
          <Route path='/Naturalb' element={<Naturalb/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App