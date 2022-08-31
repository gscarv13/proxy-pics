import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => (
  <nav className="navigation">
    LOGO
    <div className="navigation-inner-container">
      <Link to="/">Home</Link>
      <Link to="/new-order">New Order</Link>
      <Link to="/sign-in">Sign out</Link>
    </div>
  </nav>
)

export default Navigation;
