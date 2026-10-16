import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import chatRouter from './routes/chat.js';
import contactRouter from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/contact', contactRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    timestamp: new Date().toISOString(),
    system: 'VALATHI-CYBER-CORE v2.4',
    services: {
      aiAssistant: process.env.GEMINI_API_KEY ? 'GEMINI_ACTIVE' : 'LOCAL_KNOWLEDGE_ENGINE',
      contactForm: process.env.SMTP_HOST ? 'SMTP_ACTIVE' : 'LOCAL_LOG_MODE',
    }
  });
});

// Production Static Serving
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({
    error: 'Internal cyber-core malfunction.',
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║  ⚡ VALATHI FUTURISTIC PORTFOLIO - CYBER-CORE SERVER ONLINE               ║
║  📡 PORT: ${PORT}                                                        ║
║  🔗 HEALTH CHECK: http://localhost:${PORT}/api/health                       ║
║  🤖 AI STATUS: ${process.env.GEMINI_API_KEY ? 'Gemini Generative API' : 'Built-in Local Knowledge Engine'}             ║
║  📨 SMTP: ${process.env.SMTP_HOST ? 'Configured' : 'Local Console Log Mode (Ready for .env setup)'}       ║
╚══════════════════════════════════════════════════════════════════════════╝
  `);
});
