import React from 'react';

const SubHeader = ({ userName, organizations }) => {
    return (
        <div className="sub-header">
            <div className="sub-header-content">
                <span>{userName}</span>
                <select className="org-selector" name="organization" defaultValue="">
                    <option value="" disabled>Current Org: ▼</option>
                    {organizations.map((org, index) => (
                        <option key={index} value={org.BusinessName}>
                            {org.BusinessName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SubHeader;