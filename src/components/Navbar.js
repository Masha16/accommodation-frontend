import React from 'react';
import { Link } from 'react-router-dom';
 
const navbar = () => {
  return (
    <nav className="nav-style">
      <ul>
        <li><Link to="/accommodation" style={{ textDecoration: 'none' }}>Available accommodation</Link></li>
        {/* <li><Link to="/accommodation" style={{ textDecoration: 'none' }}>Available accommodation</Link></li> */}
    </ul>
    </nav>
  )
}
 
export default navbar;