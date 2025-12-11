import { useAuthContext } from './contexts/AuthContext';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { useState } from 'react';

const AppContent = () => {
  const [authType, setAuthType] = useState('login');
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Auth type={authType} onSwitchType={setAuthType} />;
  }

  return <Home />;
};

export default AppContent;