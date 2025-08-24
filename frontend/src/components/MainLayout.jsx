import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import UserSidebar from './UserSidebar';
import HRSidebar from './HRSidebar';

const MainLayout = ({ role, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {role?.toLowerCase() === 'hr' ? <HRSidebar /> : <UserSidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;