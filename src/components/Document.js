import React, { useEffect, useState } from 'react';
import { RedocStandalone } from 'redoc';
import yaml from 'js-yaml';
import Navbar from './Navbar';
import './Document.css';

function DocumentPage() {
    const [specObject, setSpecObject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const yamlContent = localStorage.getItem('uploadedYAML');
        if (!yamlContent) {
            setError("No API specification found. Please upload a valid YAML file.");
            return;
        }
        try {
            const spec = yaml.load(yamlContent);
            setSpecObject(spec);
        } catch (e) {
            setError("Error parsing YAML specification: " + e.message);
        }
    }, []);

    const handleTest = () => {
        // Open Swagger page (retrieves YAML from localStorage)
        window.open('/swagger', '_blank');
    };

    if (error) {
        return (
            <div>
                <Navbar isDocumentEnabled={true} />
                <p>{error}</p>
            </div>
        );
    }

    if (!specObject) {
        return (
            <div>
                <Navbar isDocumentEnabled={true} />
                <p>Loading specification...</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar isDocumentEnabled={true} />
            <div className="document-container">
                {/* Overlay Test button on top right of ReDoc */}
                <button className="test-btn" onClick={handleTest}>Test</button>
                <RedocStandalone
                    spec={specObject}
                    options={{
                        scrollYOffset: 50,
                        hideDownloadButton: false,
                        theme: { colors: { primary: { main: '#025f9c' } } },
                    }}
                />
            </div>
        </div>
    );
}

export default DocumentPage;
