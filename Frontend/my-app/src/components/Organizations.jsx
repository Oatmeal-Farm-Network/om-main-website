import React from 'react';

const Organizations = () => {
    return (
        <div className="card">
            <h2 className="card-title">Companies / Organizations</h2>
            <div className="org-actions">
                <a href="#add-org" className="action-link">
                    Add a New Organization
                </a>
                <a href="#delete-org" className="action-link">
                    Delete an Organization
                </a>
            </div>
        </div>
    );
};

export default Organizations;