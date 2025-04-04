import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './APIStorage.css';

function APIStorage() {
    const [apiFiles, setApiFiles] = useState([]);

    useEffect(() => {
        const storedFiles = JSON.parse(localStorage.getItem('apiFiles') || '[]');
        setApiFiles(storedFiles);
    }, []);

    const handleGenerateDoc = (file) => {
        localStorage.setItem('uploadedYAML', file.content);
        localStorage.setItem('uploadedYAMLFileName', file.fileName);
        window.location.href = '/document';
    };

    return (
        <div>
            <Navbar isDocumentEnabled={true} />
            <div className="api-storage-container">
                <h2>API Store</h2>
                <table className="api-storage-table">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Upload Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiFiles.map((file, index) => (
                            <tr key={index}>
                                <td>{file.fileName}</td>
                                <td>{file.uploadTime}</td>
                                <td>
                                    <button onClick={() => handleGenerateDoc(file)}>
                                        Generate API Doc
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {apiFiles.length === 0 && (
                            <tr>
                                <td colSpan="3">No API files stored yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default APIStorage;
