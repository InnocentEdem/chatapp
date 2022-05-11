import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
    <Auth0Provider
      domain="dev-ae4gvrfj.us.auth0.com"
      clientId="NepfsYdhReHgAQF38wU55VwezB7jCzsi"
      redirectUri={`${window.location.origin}/chat`}
      audience="localhost:5003"
      scope="read:users,read:current_user,read:user_idp_tokens"
      cacheLocation= "localstorage"
      useRefreshTokens= {true}
    >
      <App />
    </Auth0Provider>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
