import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function SwaggerEditorPage() {
    const [spec, setSpec] = useState(null);

    useEffect(() => {
        const yamlContent = localStorage.getItem('uploadedYAML');
        if (yamlContent) {
            setSpec(yamlContent);
        }
    }, []);

    if (!spec) {
        return <p>Loading Swagger Editor...</p>;
    }

    return (
        <div style={{ height: '100vh' }}>
            <SwaggerUI spec={spec} />
        </div>
    );
}

export default SwaggerEditorPage;
