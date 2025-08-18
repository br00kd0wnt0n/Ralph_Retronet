/**
 * RALPH Retronet API Integration Module
 * Handles all API calls, data fetching, and dynamic content updates
 */

class APIIntegration {
    constructor(config) {
        this.config = config;
        this.cache = new Map();
        this.refreshTimers = new Map();
    }

    /**
     * Fetch data from an API endpoint
     * @param {string} endpoint - The API endpoint URL
     * @param {object} options - Fetch options
     * @returns {Promise} - The API response data
     */
    async fetchData(endpoint, options = {}) {
        if (!endpoint) return null;

        // Check cache first
        const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < 30000) { // 30 second cache
                return cached.data;
            }
        }

        try {
            const response = await fetch(endpoint, {
                ...options,
                headers: {
                    ...this.config.api.headers,
                    ...options.headers
                },
                signal: AbortSignal.timeout(this.config.api.timeout)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            // Cache the response
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('API fetch error:', error);
            return null;
        }
    }

    /**
     * Update module content from API
     * @param {string} moduleId - The module identifier
     * @param {object} moduleConfig - The module configuration
     */
    async updateModuleContent(moduleId, moduleConfig) {
        if (!moduleConfig.apiEndpoint) return;

        const data = await this.fetchData(moduleConfig.apiEndpoint);
        if (data) {
            this.renderModuleContent(moduleId, data);
        }
    }

    /**
     * Render updated content in a module
     * @param {string} moduleId - The module identifier
     * @param {object} data - The data to render
     */
    renderModuleContent(moduleId, data) {
        const moduleElement = document.getElementById(moduleId);
        if (!moduleElement) return;

        const contentArea = moduleElement.querySelector('.window-content');
        if (!contentArea) return;

        // Module-specific rendering logic
        switch (moduleId) {
            case 'newbiz':
                this.renderNewBizContent(contentArea, data);
                break;
            case 'premieres':
                this.renderPremieresContent(contentArea, data);
                break;
            case 'shoutouts':
                this.renderShoutoutsContent(contentArea, data);
                break;
            // Add more cases as needed
            default:
                console.log(`No renderer for module: ${moduleId}`);
        }
    }

    /**
     * Render New Business Pipeline content
     */
    renderNewBizContent(container, data) {
        const html = `
            <div class="ascii-art">
    ╔══════════════════════════════╗
    ║  RALPH PIPELINE TRACKER 1.0  ║
    ╚══════════════════════════════╝
            </div>
            <div class="module-item">
                <h3>ACTIVE PITCHES</h3>
                ${data.pitches.map(pitch => `
                    <p>▸ ${pitch.name}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${pitch.progress}%;"></div>
                    </div>
                `).join('')}
            </div>
            <div class="module-item">
                <h3>UPCOMING MEETINGS</h3>
                ${data.meetings.map(meeting => `
                    <p ${meeting.urgent ? 'class="blink"' : ''}>
                        ► ${meeting.time} - ${meeting.client}
                    </p>
                `).join('')}
            </div>
        `;
        container.innerHTML = html;
    }

    /**
     * Render Premieres content
     */
    renderPremieresContent(container, data) {
        const html = `
            <div class="module-item">
                <h3>THIS MONTH</h3>
                ${data.thisMonth.map(item => `
                    <p>📅 ${item.date} - "${item.project}"</p>
                `).join('')}
            </div>
            <div class="module-item">
                <h3>NEXT MONTH</h3>
                ${data.nextMonth.map(item => `
                    <p>📅 ${item.date} - "${item.project}"</p>
                `).join('')}
            </div>
        `;
        container.innerHTML = html;
    }

    /**
     * Render Shoutouts content
     */
    renderShoutoutsContent(container, data) {
        const html = `
            <div class="module-item">
                <h3>BIRTHDAYS THIS MONTH 🎂</h3>
                ${data.birthdays.map(b => `
                    <p ${b.highlight ? 'class="blink"' : ''}>
                        ► ${b.date} - ${b.person}
                    </p>
                `).join('')}
            </div>
            <div class="module-item">
                <h3>WORK ANNIVERSARIES 🎊</h3>
                ${data.anniversaries.map(a => `
                    <p>⭐ ${a.years} Years - ${a.person}</p>
                `).join('')}
            </div>
            <div class="module-item">
                <h3>SHOUTOUTS 📢</h3>
                ${data.shoutouts.map(s => `
                    <p>"${s.message}" - ${s.from}</p>
                `).join('')}
                <button class="pixel-button" onclick="showNotification('Shoutout sent!')">
                    SEND SHOUTOUT
                </button>
            </div>
        `;
        container.innerHTML = html;
    }

    /**
     * Start auto-refresh for a module
     */
    startAutoRefresh(moduleId, moduleConfig) {
        if (!moduleConfig.apiEndpoint || !this.config.api.refreshInterval) return;

        // Clear existing timer if any
        if (this.refreshTimers.has(moduleId)) {
            clearInterval(this.refreshTimers.get(moduleId));
        }

        // Set up new timer
        const timer = setInterval(() => {
            this.updateModuleContent(moduleId, moduleConfig);
        }, this.config.api.refreshInterval);

        this.refreshTimers.set(moduleId, timer);
    }

    /**
     * Stop auto-refresh for a module
     */
    stopAutoRefresh(moduleId) {
        if (this.refreshTimers.has(moduleId)) {
            clearInterval(this.refreshTimers.get(moduleId));
            this.refreshTimers.delete(moduleId);
        }
    }

    /**
     * Submit form data to an API
     */
    async submitData(endpoint, data) {
        if (!endpoint) return { success: false, error: 'No endpoint configured' };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: this.config.api.headers,
                body: JSON.stringify(data),
                signal: AbortSignal.timeout(this.config.api.timeout)
            });

            if (!response.ok) {
                throw new Error(`Submit Error: ${response.status}`);
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            console.error('Submit error:', error);
            return { success: false, error: error.message };
        }
    }
}

/**
 * OpenAI Chatbot Integration
 */
class ChatbotAI {
    constructor(config) {
        this.config = config;
        this.conversationHistory = [];
    }

    /**
     * Initialize the chatbot with custom prompt
     */
    async initialize(customPromptFile = null) {
        if (customPromptFile) {
            try {
                const response = await fetch(customPromptFile);
                if (response.ok) {
                    this.config.systemPrompt = await response.text();
                }
            } catch (error) {
                console.error('Failed to load custom prompt:', error);
            }
        }

        // Add system prompt to conversation history
        this.conversationHistory.push({
            role: 'system',
            content: this.config.systemPrompt
        });
    }

    /**
     * Send message to OpenAI and get response
     */
    async sendMessage(message) {
        if (!this.config.enabled || !this.config.apiKey) {
            // Return fallback response if API is not configured
            return this.getFallbackResponse();
        }

        try {
            // Add user message to history
            this.conversationHistory.push({
                role: 'user',
                content: message
            });

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: this.conversationHistory,
                    temperature: this.config.temperature,
                    max_tokens: this.config.maxTokens
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Add AI response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse
            });

            // Keep conversation history manageable (last 10 exchanges)
            if (this.conversationHistory.length > 21) {
                this.conversationHistory = [
                    this.conversationHistory[0], // Keep system prompt
                    ...this.conversationHistory.slice(-20) // Keep last 20 messages
                ];
            }

            return aiResponse;
        } catch (error) {
            console.error('OpenAI API error:', error);
            return this.getFallbackResponse();
        }
    }

    /**
     * Get a fallback response when API is unavailable
     */
    getFallbackResponse() {
        const responses = this.config.fallbackResponses;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Clear conversation history (keep system prompt)
     */
    clearHistory() {
        this.conversationHistory = [this.conversationHistory[0]];
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIIntegration, ChatbotAI };
}