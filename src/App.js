import './App.css';
import React from 'react';
import AddUser from './User.js';
import Home from './Home.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login.js'

function App() {

  return(
      <BrowserRouter>
      <Routes>
        <Route path="/nxtWave" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/nxtWave/addItem" element={<AddUser/>}/>
      </Routes>
      </BrowserRouter>

);
}

export default App;
