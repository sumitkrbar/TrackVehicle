import React from 'react'
import './App.css'
import Hero from './pages/Hero'
import AddDoc from './pages/AddDoc'
import TrackDoc from './pages/TrackDoc'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<Hero/>}/>
      <Route path='/add-doc' element={<AddDoc/>}/>
      <Route path='/track-doc' element= {<TrackDoc/>}/>
    </Routes>
    </>
  )
}

export default App;
