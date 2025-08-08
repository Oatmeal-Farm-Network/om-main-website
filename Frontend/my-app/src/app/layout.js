// src/app/layout.js
import './globals.css'; // This now contains your styling
import Header from '../components/Header'; // Import your Header

export const metadata = {
  title: 'Oatmeal Farm Network',
  description: 'Your farm and livestock dashboard.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Header />
          {/* Page-specific content will be rendered here */}
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}