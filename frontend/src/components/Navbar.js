import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {
  return (
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/chat" className="nav-link">Chat</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </nav>
  )
}
