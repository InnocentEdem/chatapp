import React from 'react';
import ChatPageLayout from './ChatPageLayout';
import Login from './components/Login';
import "./App.css"
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from './auth/protected-route';
import WsLayer from './WsLayer';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <div className="App">
      <CssBaseline/>

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
