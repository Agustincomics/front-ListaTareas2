import { useState } from 'react'
import './App.css'
import Admin from './components/Admin'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import EditarTarea from './components/EditarTarea';
import CrearTarea from './components/CrearTarea';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Admin></Admin>}></Route>
        <Route exact path='/editar' element={<EditarTarea></EditarTarea>}></Route>
        <Route exact path='/crear' element={<CrearTarea></CrearTarea>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
