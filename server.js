import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Mocking Vercel's serverless function handler
import imsakiyahHandler from './api/imsakiyah.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Vercel Request/Response for the serverless function
app.all('/api/imsakiyah', async (req, res) => {
    try {
        await imsakiyahHandler(req, res);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Test API at http://localhost:${PORT}/api/imsakiyah`);
});
