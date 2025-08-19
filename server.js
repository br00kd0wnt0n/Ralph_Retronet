const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Prompt management functions
const PROMPT_STORAGE_FILE = path.join(__dirname, 'prompt-storage.json');
const DEFAULT_PROMPT = 'You are the RALPH company assistant. You help employees with:\n- Company policies and procedures\n- Project information and deadlines\n- Technical support\n- Creative inspiration\n- Team collaboration\nAlways maintain a friendly, professional tone and embody RALPH\'s creative spirit.';

// Initialize prompt storage file if it doesn't exist
function initializePromptStorage() {
    if (!fs.existsSync(PROMPT_STORAGE_FILE)) {
        const initialData = {
            currentPrompt: DEFAULT_PROMPT,
            history: [
                {
                    id: 1,
                    prompt: DEFAULT_PROMPT,
                    author: 'System',
                    timestamp: new Date().toISOString(),
                    comment: 'Initial system prompt'
                }
            ],
            nextId: 2
        };
        fs.writeFileSync(PROMPT_STORAGE_FILE, JSON.stringify(initialData, null, 2));
    }
}

// Get current system prompt
async function getSystemPrompt() {
    try {
        initializePromptStorage();
        const data = JSON.parse(fs.readFileSync(PROMPT_STORAGE_FILE, 'utf8'));
        return data.currentPrompt || DEFAULT_PROMPT;
    } catch (error) {
        console.error('Error reading prompt storage:', error);
        return DEFAULT_PROMPT;
    }
}

// Save new system prompt with versioning
async function saveSystemPrompt(prompt, author = 'Unknown', comment = '') {
    try {
        initializePromptStorage();
        const data = JSON.parse(fs.readFileSync(PROMPT_STORAGE_FILE, 'utf8'));
        
        // Don't save if prompt hasn't changed
        if (data.currentPrompt === prompt) {
            return { success: true, message: 'No changes to save' };
        }
        
        // Add to history
        const newEntry = {
            id: data.nextId,
            prompt: prompt,
            author: author,
            timestamp: new Date().toISOString(),
            comment: comment || 'Prompt updated'
        };
        
        data.history.push(newEntry);
        data.currentPrompt = prompt;
        data.nextId++;
        
        // Keep only last 50 versions to prevent file from growing too large
        if (data.history.length > 50) {
            data.history = data.history.slice(-50);
        }
        
        fs.writeFileSync(PROMPT_STORAGE_FILE, JSON.stringify(data, null, 2));
        return { success: true, message: 'Prompt saved successfully', version: newEntry.id };
    } catch (error) {
        console.error('Error saving prompt:', error);
        return { success: false, message: 'Failed to save prompt: ' + error.message };
    }
}

// Get prompt history
async function getPromptHistory() {
    try {
        initializePromptStorage();
        const data = JSON.parse(fs.readFileSync(PROMPT_STORAGE_FILE, 'utf8'));
        return data.history || [];
    } catch (error) {
        console.error('Error reading prompt history:', error);
        return [];
    }
}

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

// API endpoint for chatbot messages
app.post('/api/chatbot', express.json(), async (req, res) => {
    const { message, history = [] } = req.body;
    
    // Get OpenAI API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
        // Return fallback response if API key is not configured
        const fallbackResponses = [
            'Processing request...',
            'That\'s interesting! Tell me more.',
            'System acknowledged.',
            'Roger that!',
            'Command received.',
            'Affirmative!'
        ];
        return res.json({ 
            success: true, 
            response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
            fallback: true 
        });
    }
    
    try {
        // Read the system prompt from persistent storage
        const systemPrompt = await getSystemPrompt();
        
        // Prepare messages for OpenAI
        const messages = [
            { role: 'system', content: systemPrompt },
            ...history.slice(-10), // Keep last 10 messages for context
            { role: 'user', content: message }
        ];
        
        // Make request to OpenAI
        const fetch = require('node-fetch');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
                messages: messages,
                temperature: 0.7,
                max_tokens: 150
            })
        });
        
        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        res.json({ 
            success: true, 
            response: aiResponse,
            fallback: false 
        });
        
    } catch (error) {
        console.error('Chatbot error:', error);
        
        // Return error with fallback
        const fallbackResponses = [
            'I\'m having trouble processing that right now.',
            'Let me think about that...',
            'Interesting question! Tell me more.',
            'System processing...'
        ];
        
        res.json({ 
            success: false, 
            response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
            fallback: true,
            error: error.message 
        });
    }
});

// API endpoint to save system prompt
app.post('/api/save-prompt', express.json(), async (req, res) => {
    const { prompt, author = 'Unknown', comment = '' } = req.body;
    
    if (!prompt || prompt.trim() === '') {
        return res.status(400).json({ success: false, message: 'Prompt cannot be empty' });
    }
    
    try {
        const result = await saveSystemPrompt(prompt.trim(), author, comment);
        res.json(result);
    } catch (error) {
        console.error('Error saving prompt:', error);
        res.status(500).json({ success: false, message: 'Failed to save prompt' });
    }
});

// API endpoint to get current system prompt
app.get('/api/get-prompt', async (req, res) => {
    try {
        const prompt = await getSystemPrompt();
        res.json({ success: true, prompt });
    } catch (error) {
        console.error('Error getting prompt:', error);
        res.status(500).json({ success: false, message: 'Failed to get prompt' });
    }
});

// API endpoint to get prompt history
app.get('/api/prompt-history', async (req, res) => {
    try {
        const history = await getPromptHistory();
        res.json({ success: true, history });
    } catch (error) {
        console.error('Error getting prompt history:', error);
        res.status(500).json({ success: false, message: 'Failed to get prompt history' });
    }
});

// API endpoint to restore a previous prompt version
app.post('/api/restore-prompt', express.json(), async (req, res) => {
    const { versionId, author = 'Unknown' } = req.body;
    
    if (!versionId) {
        return res.status(400).json({ success: false, message: 'Version ID required' });
    }
    
    try {
        const history = await getPromptHistory();
        const targetVersion = history.find(entry => entry.id === parseInt(versionId));
        
        if (!targetVersion) {
            return res.status(404).json({ success: false, message: 'Version not found' });
        }
        
        const result = await saveSystemPrompt(
            targetVersion.prompt, 
            author, 
            `Restored from version ${versionId} (originally by ${targetVersion.author})`
        );
        res.json(result);
    } catch (error) {
        console.error('Error restoring prompt:', error);
        res.status(500).json({ success: false, message: 'Failed to restore prompt' });
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