import React from 'react';
// Make sure to add your logo file to the 'src/components' folder
import logo from './logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Oatmeal Farm Network Logo" className="logo" />
        <nav className="main-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#directories">Directories ▼</a>
          <a href="#livestock">Livestock DB ▼</a>
          <a href="#account">Account ▼</a>
          <a href="#advertise">Advertise</a>
          <a href="#contact">Contact Us</a>
          <a href="#signout">Sign Out</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;