// src/app/page.js
import SubHeader from '../components/SubHeader';
import MyAccount from '../components/MyAccount';
import Organizations from '../components/Organizations';

// This is a Server Component, so we can make it async and fetch data!
async function getOrganizations() {
  // In a real app, you would fetch from your API here.
  // const res = await fetch('https://yourapi.com/organizations');
  // const data = await res.json();
  // return data;

  // For now, we'll use your mock data.
  const mockOrganizations = [
    { BusinessID: 101, BusinessName: 'Sunny Meadow Farm', BusinessType: 'Farm' },
    { BusinessID: 102, BusinessName: 'Green Valley Co-op', BusinessType: 'Association' },
  ];
  return mockOrganizations;
}

export default async function HomePage() {
  // 1. Fetch data directly on the server. No more loading state!
  const organizations = await getOrganizations();

  // 2. Define user data, just like before.
  const currentUser = {
    name: 'Charlie',
    isFirstTime: false,
    subscriptionLevel: 4, // 4 = Premium
    custAIEndService: new Date(2026, 0, 15) // Jan 15, 2026
  };

  // Render the page. The data is already here when the page loads.
  return (
    <>
      <SubHeader userName={currentUser.name} organizations={organizations} />
      <div className="dashboard-layout">
        <MyAccount
          level={currentUser.subscriptionLevel}
          endDate={currentUser.custAIEndService}
        />
        <Organizations />
      </div>
    </>
  );
}