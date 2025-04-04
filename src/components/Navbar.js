import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isDocumentEnabled }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/upload">Upload</NavLink>
                </li>
                <li>
                    <NavLink to="/api-store">API Storage</NavLink>
                </li>
                <li className={isDocumentEnabled ? '' : 'disabled'}>
                    {isDocumentEnabled ? (
                        <NavLink to="/document">Document</NavLink>
                    ) : (
                        <span>Document</span>
                    )}
                </li>
                <li className="logout-li">
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
