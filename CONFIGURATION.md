# RALPH Retronet Configuration Guide

## Quick Setup

### 1. Basic Configuration
The main configuration file is `cms-config.js`. This file controls all content and settings for the intranet.

### 2. OpenAI Chatbot Setup
To enable AI-powered chatbot:

1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Edit `cms-config.js` and update the chatbot configuration:

```javascript
chatbot: {
    openai: {
        enabled: true, // Set to true
        apiKey: "your-openai-api-key-here", // Add your API key
        model: "gpt-4", // or "gpt-3.5-turbo" for cost savings
        temperature: 0.7,
        maxTokens: 150,
        systemPrompt: "..." // Uses custom-prompt.txt by default
    }
}
```

3. Customize `custom-prompt.txt` with your company-specific instructions

### 3. API Integrations
To connect external APIs for dynamic content:

1. Update the `apiEndpoint` fields in `cms-config.js` for each module:

```javascript
modules: {
    newBiz: {
        apiEndpoint: "https://your-api.com/pipeline", // Add your API URL
        // ... other config
    },
    premieres: {
        apiEndpoint: "https://your-api.com/premieres",
        // ... other config
    }
    // ... other modules
}
```

2. Set your base API configuration:

```javascript
api: {
    baseUrl: "https://your-api.com",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-token', // Add auth if needed
    },
    refreshInterval: 60000, // Refresh every 60 seconds
}
```

### 4. Content Management

#### Module Content
All module content is defined in `cms-config.js` under the `modules` section. You can:

- Enable/disable modules with the `enabled` flag
- Change module titles and icons
- Update static content
- Configure API endpoints for dynamic content

#### System Settings
Update company branding in the `system` section:

```javascript
system: {
    version: "1.0",
    companyName: "YOUR COMPANY",
    primaryColor: "#YOUR_COLOR",
    bootMessages: [
        'Loading your custom messages...',
        // ... customize boot sequence
    ]
}
```

## API Data Formats

### Expected API Response Formats

#### New Business Pipeline (`/pipeline`)
```json
{
    "pitches": [
        { "name": "Client Name - Project Type", "progress": 75 }
    ],
    "meetings": [
        { "time": "Tomorrow 2:00 PM", "client": "Client Name", "urgent": true }
    ]
}
```

#### Premieres (`/premieres`)
```json
{
    "thisMonth": [
        { "date": "Dec 15", "project": "Project Name" }
    ],
    "nextMonth": [
        { "date": "Jan 10", "project": "Another Project" }
    ]
}
```

#### Shoutouts (`/shoutouts`)
```json
{
    "birthdays": [
        { "date": "Today", "person": "John Doe", "highlight": true }
    ],
    "anniversaries": [
        { "years": 5, "person": "Jane Smith" }
    ],
    "shoutouts": [
        { "message": "Great work on the project!", "from": "Management" }
    ]
}
```

### Form Submissions

#### Suggestion Box (`/suggestions`)
POST request format:
```json
{
    "name": "Employee Name",
    "idea": "Suggestion text",
    "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Deployment

### Environment Variables
For production deployment, consider using environment variables:

```bash
OPENAI_API_KEY=your_api_key_here
API_BASE_URL=https://your-api.com
API_TOKEN=your_auth_token
```

### Security Notes
- Never commit API keys to version control
- Use environment variables or secure configuration management
- Implement proper CORS policies for API endpoints
- Use HTTPS for all API communications

## Customization

### Adding New Modules
1. Add module configuration to `cms-config.js`
2. Create HTML structure in `index.html`
3. Add rendering logic in `api-integration.js`
4. Update icon grid if needed

### Styling Changes
- Primary colors are defined as CSS variables in `:root`
- Mobile responsive breakpoints can be adjusted in media queries
- ASCII art can be customized in the desktop-ascii section

### Advanced Features
- Auto-refresh intervals can be configured per module
- Multiple API endpoints can be configured for different content types
- Caching duration can be adjusted in `api-integration.js`

## Support

For technical support:
- Check browser console for error messages
- Verify API endpoints are accessible
- Ensure all required files are properly loaded
- Test with fallback configurations first