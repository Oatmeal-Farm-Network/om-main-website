// src/components/ClientOnlyDate.jsx
'use client';

import { useState, useEffect } from 'react';

const ClientOnlyDate = ({ date }) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        // This code only runs on the client, after the initial render
        const formatDate = (d) => {
            if (!(d instanceof Date) || isNaN(d)) {
                return "Not Set";
            }
            return d.toLocaleDateString(); // Now this is safe
        };
        setFormattedDate(formatDate(date));
    }, [date]);

    // Render a placeholder or nothing on the server
    if (!formattedDate) {
        return null; // Or return a loading spinner, etc.
    }

    return <strong>{formattedDate}</strong>;
};

export default ClientOnlyDate;