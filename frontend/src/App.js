import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import './App.css'
function App() {
  return (
    <div className="App">

      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About/>} />
      <Route exact path="/chat" element={<Chat />} />
      <Route exact path="/contact" element={<Contact />} />
      </Routes> 
      
    </div>
  );
}

export default App;
