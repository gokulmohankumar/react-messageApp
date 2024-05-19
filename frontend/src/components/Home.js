import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
export default function Home() {
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="content">
        <h1>Welcome to Our CHAT application</h1>
        <p>Explore our amazing features and services.</p>
        <div className="features">
          <h2>Our Features</h2>
          <ul>
            <li>React</li>
            <li>Express</li>
            <li>Node</li>
          </ul>
        </div>
        <div className="services">
          <h2>Our Services allows you to</h2>
          <ul>
            <li>send message</li>
            <li>Edit / Delete message</li>
            <li>Search message</li>
          </ul>
        </div>
        <div className="call-to-action">
          <p>Ready to get started?</p>
          <Link to="/chat">
          <button>Click here to try chat</button></Link>
        </div>
      </div>
    </div>
  );
}

