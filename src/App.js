import React from 'react'
import MainContainer from "./Components/MainContainer"
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
const App = () => {
  return (
    <div className="w-screen h-full flex flex-col">
      <Header/>
      <main className=" h-screen mt-8 md:mt-12 lg:mt-1 px-5 bg-rose-200  w-full">
        <Routes>
          <Route path='/*' element={<MainContainer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App