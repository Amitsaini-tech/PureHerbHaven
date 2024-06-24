import React from 'react'
import MainContainer from "./Components/MainContainer"
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div className="w-screen h-full flex flex-col">
      <main>
        <Routes>
          <Route path='/*' element={<MainContainer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App