import './App.css';
import React from 'react';
import AddUser from './User.js';
import Home from './Home.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login.js'

function App() {

  return(
      <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/addItem" element={<AddUser/>}/>
      </Routes>
      </BrowserRouter>

);
}

export default App;
