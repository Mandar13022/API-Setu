import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Upload.css';

function Upload() {
    const [fileContent, setFileContent] = useState(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.name.endsWith('.yaml') && !file.name.endsWith('.yml')) {
            setError('Please upload a valid YAML file');
            return;
        }
        setFileName(file.name);
        setError(null);

        const reader = new FileReader();
        reader.onload = (evt) => {
            setFileContent(evt.target.result);
        };
        reader.readAsText(file);
    };

    const handleGenerateAPIDoc = () => {
        // Save YAML for documentation
        localStorage.setItem('uploadedYAML', fileContent);
        localStorage.setItem('uploadedYAMLFileName', fileName);
        window.location.href = '/document'

        // Save file info in "API Store" list (using localStorage for demo)
        const storedFiles = JSON.parse(localStorage.getItem('apiFiles') || '[]');
        const now = new Date().toLocaleString();
        storedFiles.push({ fileName, content: fileContent, uploadTime: now });
        localStorage.setItem('apiFiles', JSON.stringify(storedFiles));

        // Send file to backend (adjust URL if needed)
        fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, content: fileContent }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Backend response:', data);
                // Automatically navigate to documentation page
                navigate('/document');
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Navbar isDocumentEnabled={false} />
            <div className="upload-container">
                <h2>Upload YAML File</h2>
                <div className="upload-box">
                    <input type="file" accept=".yaml, .yml" onChange={handleFileChange} />
                    {error && <p className="error">{error}</p>}
                </div>
                {fileContent && (
                    <button className="generate-btn" onClick={handleGenerateAPIDoc}>
                        Generate API Doc
                    </button>
                )}
            </div>
        </div>
    );
}

export default Upload;
