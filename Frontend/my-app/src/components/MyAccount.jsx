import React from 'react';
import ClientOnlyDate from './ClientOnlyDate';

const MyAccount = ({ level, endDate }) => {
    // A mapping for membership levels to their display names and colors
    const membershipInfo = {
        4: { name: "Premium", color: "#0000ff" },
        19: { name: "Lifetime", color: "green" },
        1: { name: "Basic", color: "gray" },
        // Add other levels as needed
    };

    const currentLevel = membershipInfo[level] || { name: "Unknown", color: "black" };

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return "Not Set";
        }
        return date.toLocaleDateString();
    };


    return (
        <div className="card">
            <h2 className="card-title">My Account</h2>
            <div className="account-details">
                <p>
                    Membership Level: <span style={{ color: currentLevel.color, fontWeight: 'bold' }}>{currentLevel.name}</span>
                </p>
                <p>Membership Ends: <ClientOnlyDate date={endDate} /></p>
            </div>
            <div className="account-links">
                <a href="#manage">Manage Account</a>
                <a href="#password">Password</a>
            </div>
        </div>
    );
};

export default MyAccount;