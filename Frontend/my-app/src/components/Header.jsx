// src/components/Header.jsx
import React from 'react';
import Image from 'next/image'; // <-- Import Next.js Image
import Link from 'next/link';   // <-- Import Next.js Link
import logo from './logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                {/* Use the Image component */}

                <Image src={logo} alt="Oatmeal Farm Network Logo" className="logo" priority width={450} height={135} />
                <nav className="main-nav">
                    {/* Use Link for internal navigation */}
                    <Link href="/">Dashboard</Link>
                    <Link href="/directories">Directories ▼</Link>
                    <Link href="/livestock">Livestock DB ▼</Link>
                    <Link href="/account">Account ▼</Link>
                    {/* Keep these as `a` tags if they go to different sections or external pages */}
                    <a href="#advertise">Advertise</a>
                    <a href="#contact">Contact Us</a>
                    <a href="#signout">Sign Out</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;