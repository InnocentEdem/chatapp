import React from 'react';
import Login from './components/Login';
import "./App.css"
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from './auth/protected-route';
import WsLayer from './WsLayer';
import { CssBaseline } from '@mui/material';
import { Notifications } from 'react-push-notification';


function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <Notifications />
      <Routes>
        <Route
        path="/"
        element = {<Login/>}
        />
        <Route
          path = "/chat"
          element={ProtectedRoute(WsLayer)}
        />
      </Routes>
    </div>
  );
}

export default App;
