import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const App = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data that would typically come from your API/database
  // This replicates the SQL query from the ASP file:
  // "SELECT * from businessaccess, business, businesstypelookup WHERE businessaccess.Businessid = business.businessid and Business.BusinessTYPeID = businesstypelookup.Businesstypeid and PeopleID = [PeopleID] order by BusinessTypeIDOrder"
  
  useEffect(() => {
    // Simulating API call - replace this with your actual API call
    const fetchOrganizations = async () => {
      try {
        // Mock data representing the database query results
        const mockOrganizations = [
          // All organizations have been deleted as requested
        ];

        // In a real app, you would make an API call here:
        // const response = await fetch('/api/organizations?peopleId=' + peopleId);
        // const organizations = await response.json();
        
        setOrganizations(mockOrganizations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Sample user data
  const currentUser = {
    isFirstTime: false,
    subscriptionLevel: 4, // Premium
    custAIEndService: new Date(2026, 0, 15) // January 15, 2026
  };

  const peopleId = 12345; // This would come from your authentication system

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Dashboard
        peopleId={peopleId}
        showMembership={false} // Set to true to show membership renewal card
        hideFavorite={true}   // Set to false to show favorite association card
        organizations={organizations}
        currentUser={currentUser}
      />
    </div>
  );
};

export default App; 