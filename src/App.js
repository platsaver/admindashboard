import React, { useState } from 'react';
import './App.css';
import CheckUsername from './Authorization/CheckUserName.jsx';
import CheckPassword from './Authorization/CheckPassword.jsx';
import Admin from './Admin.jsx';

function App() {
  const [step, setStep] = useState('username');
  const [userData, setUserData] = useState({
    username: '',
    device_id: '',
    access_code: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameSuccess = ({ username, device_id, access_code }) => {
    setUserData({ username, device_id, access_code });
    setStep('password');
  };

  const handleLoginSuccess = ({ user_id, username }) => {
    setIsLoggedIn(true);
    console.log('Login successful:', { user_id, username });
  };

  return (
    <div className="App">
      {step === 'username' && (
        <CheckUsername onNext={handleUsernameSuccess} />
      )}
      {step === 'password' && !isLoggedIn && (
        <CheckPassword
          username={userData.username}
          device_id={userData.device_id}
          access_code={userData.access_code}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {isLoggedIn && (
        <Admin username={userData.username} />
      )}
    </div>
  );
}

export default App;