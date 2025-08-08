import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({
    peopleId,
    showMembership = false,
    hideFavorite = true,
    organizations = [],
    currentUser = {}
}) => {
    const [accountStatus, setAccountStatus] = useState('');

    // Mock data (you should replace with your actual data fetching logic)
    const mockData = {
        currentUser: {
            isFirstTime: true,
            subscriptionLevel: 4, // 0: Expired, 1: Basic, 4: Premium, 5: Vendor, 19: Lifetime
            custAIEndService: new Date(2026, 0, 15), // January 15, 2026
            ...currentUser
        },
        subscriptionLevelNames: {
            0: { name: "Expired", color: "red" },
            1: { name: "Basic", color: "gray" },
            4: { name: "Premium", color: "blue" },
            5: { name: "Vendor", color: "purple" },
            19: { name: "Lifetime", color: "green" }
        },
        animals: [
            { fullName: "Babe", speciesID: 1, publishForSale: 1, publishStud: 0, lastUpdated: new Date(2025, 6, 10) },
            { fullName: "Wilbur", speciesID: 1, publishForSale: 0, publishStud: 1, lastUpdated: new Date(2025, 5, 20) },
            { fullName: "Shep", speciesID: 2, publishForSale: 1, publishStud: 1, lastUpdated: new Date(2025, 4, 15) }
        ],
        products: [
            { prodName: "Organic Apples", prodCategoryId: 3, prodPrice: 3.99, prodQuantityAvailable: 50, prodForSale: 1 },
            { prodName: "Fresh Eggs (Dozen)", prodCategoryId: 4, prodPrice: 5.50, prodQuantityAvailable: 20, prodForSale: 1 },
            { prodName: "Homemade Jam", prodCategoryId: 5, prodPrice: 7.00, prodQuantityAvailable: 0, prodForSale: 0 }
        ],
        packages: [],
        properties: [],
        speciesMap: {
            1: "Pig",
            2: "Sheep",
            3: "Fruit",
            4: "Poultry",
            5: "Processed Food"
        }
    };

    /**
     * Formats a date object to a localized date string (e.g., "M/D/YYYY").
     */
    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return "Not Set";
        }
        return date.toLocaleDateString();
    };

    /**
     * Renders the account status section.
     */
    const renderAccountStatus = () => {
        const { subscriptionLevel, custAIEndService } = mockData.currentUser;
        const now = new Date();
        let statusHtml = '';

        // Check if subscription has expired
        if (subscriptionLevel === 0 || (custAIEndService && custAIEndService < now && subscriptionLevel !== 19)) {
            statusHtml += `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong class="font-bold">Your Account Has Expired!</strong>
          <span class="block sm:inline">Your products and animals are not currently appearing.</span>
          <ul class="mt-2 list-disc list-inside">
            <li>Renew your account by clicking the button below.</li>
            <li>Republish your animals and products.</li>
          </ul>
        </div>
      `;
        } else if (subscriptionLevel < 1 && custAIEndService > now) {
            statusHtml += `
        <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong class="font-bold">Your Account is Not Currently Active!</strong>
          <span class="block sm:inline">A payment for your account has not been processed yet. If you just signed up, your payment might take a little time to process.</span>
        </div>
      `;
        }

        const subLevelInfo = mockData.subscriptionLevelNames[subscriptionLevel] || { name: "Unknown", color: "gray" };

        statusHtml += `
      <p class="body">Membership Level: <b style="color:${subLevelInfo.color};">${subLevelInfo.name}</b></br>
      Membership Ends: <b>${formatDate(custAIEndService)}</b></p> 
      <p class="body"><a href="MembersAccountContactsEdit.asp#top" class="body">Manage Account</a></br>
      <a href="/members/MembersPasswordChange.asp?ID=${peopleId}" class="body">Password</a></p>
    `;

        return statusHtml;
    };

    useEffect(() => {
        setAccountStatus(renderAccountStatus());
    }, [mockData.currentUser]);

    const OrganizationCard = ({ organization }) => {
        const hide = true; // Corresponds to ASP hide variable

        return (
            <div className="dashboard-link-card">
                <div className="organization-card-content">
                    <span className="dashboard-card-title">{organization.BusinessName}</span>
                    <span className="text-gray-600">{organization.BusinessType} Account</span>
                    <div className="organization-card-links mt-2">
                        <ul className="flex flex-wrap gap-x-4 gap-y-1">
                            <li>
                                <a className="body" href={`MembersOrgAccountContactsEdit.asp?BusinessID=${organization.BusinessID}`}>
                                    Manage Account
                                </a>
                            </li>
                            {organization.BusinessTypeID === 8 ? (
                                <>
                                    <li>
                                        <a className="body" href={`list_events.asp?BusinessID=${organization.BusinessID}`}>
                                            Events
                                        </a>
                                    </li>
                                    <li>
                                        <a className="body" href={`MembersAnimalAdd1.asp?BusinessID=${organization.BusinessID}`}>
                                            Add Livestock
                                        </a>
                                    </li>
                                    <li>
                                        <a className="body" href={`MembersAnimalshome.asp?BusinessID=${organization.BusinessID}`}>
                                            List of Livestock
                                        </a>
                                    </li>
                                    {!hide && (
                                        <>
                                            <li>
                                                <a className="body" href={`MembersProduceInventory.asp?BusinessID=${organization.BusinessID}`}>
                                                    Produce Inventory
                                                </a>
                                            </li>
                                            <li>
                                                <a className="body" href={`MembersSellerOrders.asp?BusinessID=${organization.BusinessID}`}>
                                                    Orders
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </>
                            ) : (
                                <li>
                                    <a className="body" href={`list_events.asp?BusinessID=${organization.BusinessID}`}>
                                        Events
                                    </a>
                                </li>
                            )}
                            <li>
                                <a href={`AdminOrgDelete.asp?BusinessID=${organization.BusinessID}`} className="text-red-600 hover:text-red-800">
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="dashboard-grid">
            <section id="account-links-section" className="dashboard-section bg-gradient-to-tr from-green-100 to-lime-100">
                <h2 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-3">
                    My Account
                </h2>
                <div id="account-status" className="mb-4 text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: accountStatus }} />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4">
                    {showMembership && (
                        <a href="MembersRenewSubscription.asp" className="dashboard-link-card">
                            <div className="dashboard-link-card-content">
                                <span className="dashboard-link-card-title">Renew / Upgrade Membership</span>
                                <a href="MembersRenewSubscription.asp" className="body">View Options</a>
                            </div>
                        </a>
                    )}
                    {!hideFavorite && (
                        <a href="/Members/MembersAssociations.asp" className="dashboard-link-card">
                            <div className="dashboard-link-card-content">
                                <span className="dashboard-link-card-title">Favorite Association</span>
                                <a href="/Members/MembersAssociations.asp" className="body">Manage Favorite</a>
                            </div>
                        </a>
                    )}
                </div>
            </section>

            <section id="companies-organizations-section" className="dashboard-section bg-gradient-to-tr from-green-100 to-lime-100">
                <h2 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-3">
                    Companies / Organizations
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4">
                    <a href="CreateNewOrgAccount.asp" className="dashboard-link-card">
                        <div className="dashboard-link-card-content">
                            <span className="dashboard-link-card-title">Add a New Organization</span>
                        </div>
                    </a>
                    <a href="AdminOrgDelete.asp" className="dashboard-link-card">
                        <div className="dashboard-link-card-content">
                            <span className="dashboard-link-card-title">Delete an Organization</span>
                        </div>
                    </a>

                    {organizations.map((org, index) => (
                        <OrganizationCard key={index} organization={org} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard; 