import React, { use } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const RootLayout = () => {
  const {theme} = use(AuthContext);

  return (
    <div data-theme = {theme} className='h-screen'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;