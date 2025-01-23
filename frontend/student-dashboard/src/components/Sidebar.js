import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <button onClick={() => navigate('/students')}>Students Page</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;