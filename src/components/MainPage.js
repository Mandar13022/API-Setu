import React, { useState } from 'react';
import Navbar from './Navbar';

function MainPage() {
    const [isDocumentEnabled, setIsDocumentEnabled] = useState(false);

    // The idea is that once a user uploads a YAML or picks one from API store,
    // you can set isDocumentEnabled(true).

    return (
        <div>
            <Navbar isDocumentEnabled={isDocumentEnabled} />
            <div style={{ padding: '1rem' }}>
                <h1>Welcome to API-SETU</h1>
                <p>Use the navigation above to upload or view stored APIs.</p>
            </div>
        </div>
    );
}

export default MainPage;
