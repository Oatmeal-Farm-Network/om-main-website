import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import MyAccount from './components/MyAccount';
import Organizations from './components/Organizations';
import './App.css'; // Changed from Dashboard.css

const App = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const mockOrganizations = [
           // Example data - this would come from your API
           { BusinessID: 101, BusinessName: 'Sunny Meadow Farm', BusinessType: 'Farm' },
           { BusinessID: 102, BusinessName: 'Green Valley Co-op', BusinessType: 'Association' },
        ];
        setOrganizations(mockOrganizations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  const currentUser = {
    name: 'Charlie',
    isFirstTime: false,
    subscriptionLevel: 4, // 4 = Premium
    custAIEndService: new Date(2026, 0, 15) // Jan 15, 2026
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <SubHeader userName={currentUser.name} organizations={organizations} />
      <main className="main-content">
        <div className="dashboard-layout">
          <MyAccount
            level={currentUser.subscriptionLevel}
            endDate={currentUser.custAIEndService}
          />
          <Organizations />
        </div>
      </main>
    </div>
  );
};

export default App;