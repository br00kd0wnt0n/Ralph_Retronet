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
    const fs = require('fs');
    const path = require('path');
    
    try {
        const configData = req.body;
        console.log('Config update requested for modules:', Object.keys(configData.modules || {}));
        
        // Create the updated cms-config.js content
        const configFileContent = `/**
 * RALPH Retronet CMS Configuration
 * This file contains all configurable content for the intranet dashboard
 * Can be easily modified or connected to a backend CMS/API
 */

const CMS_CONFIG = ${JSON.stringify(configData, null, 4)};

// Make available globally for browser
if (typeof window !== 'undefined') {
    window.CMS_CONFIG = CMS_CONFIG;
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CMS_CONFIG;
}
`;
        
        // Write to cms-config.js file
        const configFilePath = path.join(__dirname, 'cms-config.js');
        fs.writeFileSync(configFilePath, configFileContent, 'utf8');
        
        // Also write a clean JSON file for easy loading
        const jsonFilePath = path.join(__dirname, 'cms-config.json');
        fs.writeFileSync(jsonFilePath, JSON.stringify(configData, null, 2), 'utf8');
        
        console.log('Configuration saved successfully to cms-config.js and cms-config.json');
        res.json({ success: true, message: 'Configuration saved successfully' });
        
    } catch (error) {
        console.error('Error saving configuration:', error);
        res.status(500).json({ success: false, message: 'Failed to save configuration: ' + error.message });
    }
});

// API endpoint to get current configuration
app.get('/api/get-config', (req, res) => {
    try {
        const fs = require('fs');
        const jsonConfigPath = path.join(__dirname, 'cms-config.json');
        const jsConfigPath = path.join(__dirname, 'cms-config.js');
        
        // Try to read from JSON file first (cleaner)
        if (fs.existsSync(jsonConfigPath)) {
            const config = JSON.parse(fs.readFileSync(jsonConfigPath, 'utf8'));
            res.json(config);
        } 
        // Fallback to original cms-config.js if JSON doesn't exist
        else if (fs.existsSync(jsConfigPath)) {
            // For initial load, read from the original config file
            delete require.cache[require.resolve('./cms-config.js')];
            
            // Create a temporary global context to safely evaluate the config
            const vm = require('vm');
            const configContent = fs.readFileSync(jsConfigPath, 'utf8');
            
            // Extract just the config object
            const configMatch = configContent.match(/const CMS_CONFIG = ({[\s\S]*?});/);
            if (configMatch) {
                const sandbox = {};
                vm.createContext(sandbox);
                vm.runInContext(`const CMS_CONFIG = ${configMatch[1]}`, sandbox);
                res.json(sandbox.CMS_CONFIG);
            } else {
                throw new Error('Could not parse CMS_CONFIG from file');
            }
        } else {
            throw new Error('Configuration file not found');
        }
    } catch (error) {
        console.error('Error loading configuration:', error);
        res.status(500).json({ error: 'Failed to load configuration: ' + error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`RALPH Retronet Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the dashboard`);
});