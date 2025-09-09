import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import PageLoader from '../../../components/PageLoader/PageLoader';
import ham from '../../../assets/images/hamburger.svg'
import './AdminLayout.scss'


function AdminLayout() {
  const  {loadingauthcheck} = useSelector(state=> state.loginReducer)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth>=768);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);


  return (
    <>
    {/* Overlay for mobile */}
    {sidebarOpen && (
        <div 
          className="d-lg-none position-fixed w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 999 }}
          onClick={toggleSidebar}
        ></div>
      )}
      {
        loadingauthcheck
        ?
        <PageLoader open={loadingauthcheck}/>
        :
        <div className={`d-flex admin-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
  <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  <main className="p-4">
    <div className="container-fluid">
      {!sidebarOpen && (
        <img
          className="me-3 openner"
          src={ham}
          width={'17px'}
          alt=""
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1001,
          }}
        />
      )}
      <Outlet />
    </div>
  </main>
</div>

    }
    </>
  );
}

export default AdminLayout;