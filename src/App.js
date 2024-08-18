import React from 'react'
import Calender from './Components/Calender'
import { Route, Router, Routes } from 'react-router-dom'
import EventDetails from './Components/EventDetails'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Calender/>}/>
        <Route path='/eventdetail' element={<EventDetails/>}/>
      </Routes>
    </div>
  )
}

export default App