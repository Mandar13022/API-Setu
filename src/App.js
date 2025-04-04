import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import MainPage from './components/MainPage';
import Upload from './components/Upload';
import DocumentPage from './components/Document';
import APIStorage from './components/APIStorage';
import SwaggerEditorPage from './components/SwaggerEditorPage';

function App() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <div className="app-container">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/main" element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />} />
                <Route path="/upload" element={isLoggedIn ? <Upload /> : <Navigate to="/login" />} />
                <Route path="/api-store" element={isLoggedIn ? <APIStorage /> : <Navigate to="/login" />} />
                <Route path="/document" element={isLoggedIn ? <DocumentPage /> : <Navigate to="/login" />} />
                <Route path="/swagger" element={isLoggedIn ? <SwaggerEditorPage /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/main" />} />
            </Routes>
        </div>
    );
}

export default App;
