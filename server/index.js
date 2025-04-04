const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

app.post('/api/upload', (req, res) => {
    const { fileName, content } = req.body;
    // Define the folder path
    const storeDir = path.join(__dirname, '..', 'src', 'components', 'API_Store');

    // Create directory if it doesn't exist
    if (!fs.existsSync(storeDir)) {
        fs.mkdirSync(storeDir, { recursive: true });
    }

    const filePath = path.join(storeDir, fileName);
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error writing file' });
        }
        return res.json({ message: 'File saved successfully', filePath });
    });
});

app.listen(5000, () => console.log('Server started on port 5000'));
