import React, { useState, useEffect } from "react";
import { Router, navigate } from '@reach/router';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Content from './components/Content';
import Protected from './components/Protected';

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    await fetch('http://192.168.0.103:4000/logout', {
      method: 'POST',
      credentials: 'include'
    });

    setUser({});
    navigate('/');
  }

  useEffect(() => {
      async function checkRefershToken() {
        const result = await (await fetch('http://192.168.0.103:4000/refresh_token', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })).json();
        setUser({
          accesstoken: result.accesstoken
        });
        setLoading(false);
      }

      checkRefershToken();
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <img className="photo" src={require('./images/Logo.png')} alt="Logo" />
        <Router id="router">
          <Login path="login" />
          <Register path="register" />
          <Protected logOutCallback={logOutCallback} path="contacts" />
          <Content logOutCallback={logOutCallback} path="/" />
        </Router>
        <Navigation />
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
