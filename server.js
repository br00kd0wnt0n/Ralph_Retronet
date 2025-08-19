const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple session management (in production, use proper session store)
const activeSessions = new Map();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin authentication endpoint
app.post('/api/admin-auth', express.json(), (req, res) => {
    const { username, password } = req.body;
    
    // Check credentials (in production, hash passwords!)
    if (username === 'ralph' && password === 'admin123') {
        const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const sessionData = {
            username: username,
            loginTime: new Date(),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        };
        
        activeSessions.set(sessionId, sessionData);
        
        res.json({ 
            success: true, 
            sessionId: sessionId,
            redirectUrl: '/admin'
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Check session endpoint
app.get('/api/check-session/:sessionId', (req, res) => {
    const sessionId = req.params.sessionId;
    const session = activeSessions.get(sessionId);
    
    if (session && session.expires > new Date()) {
        res.json({ valid: true, user: session.username });
    } else {
        if (session) activeSessions.delete(sessionId);
        res.json({ valid: false });
    }
});

// Serve the admin panel with session check
app.get('/admin/:sessionId?', (req, res) => {
    const sessionId = req.params.sessionId;
    
    if (sessionId) {
        const session = activeSessions.get(sessionId);
        if (session && session.expires > new Date()) {
            // Valid session, serve admin panel with auto-login
            res.sendFile(path.join(__dirname, 'admin.html'));
            return;
        }
    }
    
    // No valid session, serve normal admin panel
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// API endpoint for saving configuration
app.post('/api/save-config', express.json(), (req, res) => {
    // In a real implementation, you would save to database or file
    // For now, just return success
    console.log('Config update requested:', req.body);
    res.json({ success: true, message: 'Configuration saved successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`RALPH Retronet Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the dashboard`);
});