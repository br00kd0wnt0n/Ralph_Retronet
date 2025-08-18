/**
 * RALPH Retronet CMS Configuration
 * This file contains all configurable content for the intranet dashboard
 * Can be easily modified or connected to a backend CMS/API
 */

const CMS_CONFIG = {
    // System Configuration
    system: {
        version: "1.0",
        companyName: "RALPH",
        primaryColor: "#EB008B",
        bootMessages: [
            'Loading system kernel...',
            'Initializing RALPH protocols...',
            'Checking security clearance...',
            'Loading user preferences...',
            'Mounting network drives...',
            'Starting creative services...',
            'Loading project database...',
            'Initializing communication modules...',
            'Checking for updates...',
            'Loading desktop environment...',
            'Starting RALPH SUPER-INTRANET...',
            'System ready!'
        ]
    },

    // Chatbot Configuration
    chatbot: {
        enabled: true,
        title: "RALPH Assistant v1.0",
        welcomeMessage: "Welcome to RALPH's Super-Intranet!",
        helpText: `Here's what you can do:
► Click any desktop icon to open modules
► Drag windows by their title bars
► Minimize, maximize, or close windows
► Submit suggestions in the Suggestion Box
► Accept monthly creative challenges
► Check project pipelines and deadlines
► Send shoutouts to team members`,
        
        // OpenAI Configuration (to be filled with your API details)
        openai: {
            enabled: false, // Set to true when API key is provided
            apiKey: "", // Add your OpenAI API key here
            model: "gpt-4", // or "gpt-3.5-turbo"
            temperature: 0.7,
            maxTokens: 150,
            
            // Custom company prompt - replace with your file content
            systemPrompt: `You are the RALPH company assistant. You help employees with:
- Company policies and procedures
- Project information and deadlines
- Technical support
- Creative inspiration
- Team collaboration
Always maintain a friendly, professional tone and embody RALPH's creative spirit.`,
            
            // Fallback responses when API is disabled
            fallbackResponses: [
                'Processing request...',
                'That\'s interesting! Tell me more.',
                'System acknowledged.',
                'Roger that!',
                'Command received.',
                'Affirmative!'
            ]
        }
    },

    // Module Content Configuration
    modules: {
        newBiz: {
            title: "New Business Pipeline v2.0",
            icon: "📊",
            enabled: true,
            content: {
                header: "RALPH PIPELINE TRACKER 1.0",
                activePitches: [
                    { name: "Global Tech Corp - Video Campaign", progress: 75 },
                    { name: "Fashion Brand X - Social Strategy", progress: 45 },
                    { name: "Auto Company Z - Launch Film", progress: 90 }
                ],
                upcomingMeetings: [
                    { time: "Tomorrow 2:00 PM", client: "Tech Startup Pitch", urgent: true },
                    { time: "Thursday", client: "Beauty Brand Presentation", urgent: false },
                    { time: "Next Week", client: "Entertainment Client RFP", urgent: false }
                ]
            },
            // API endpoint for dynamic content
            apiEndpoint: null // Set to your API URL when ready
        },

        premieres: {
            title: "Project Premiere Calendar",
            icon: "🎬",
            enabled: true,
            content: {
                thisMonth: [
                    { date: "Dec 15", project: "Urban Dreams Documentary" },
                    { date: "Dec 20", project: "Holiday Campaign Launch" },
                    { date: "Dec 28", project: "Year-End Showcase" }
                ],
                nextMonth: [
                    { date: "Jan 10", project: "New Product Launch Film" },
                    { date: "Jan 15", project: "Brand Refresh Campaign" },
                    { date: "Jan 25", project: "Super Bowl Teaser" }
                ]
            },
            apiEndpoint: null
        },

        challenge: {
            title: "Monthly Creative Challenge",
            icon: "🎨",
            enabled: true,
            content: {
                currentChallenge: {
                    month: "DECEMBER",
                    theme: "Retro Future",
                    description: "Create a 30-second concept using only 8-bit graphics and chiptune music!",
                    prize: "🏆 Golden Pixel Award + Extra PTO Day"
                },
                lastWinner: {
                    name: "Sarah M.",
                    concept: "Neon Dreams"
                }
            },
            apiEndpoint: null
        },

        shoutouts: {
            title: "Shoutouts & Celebrations",
            icon: "🎉",
            enabled: true,
            content: {
                birthdays: [
                    { date: "Today", person: "Mike R. from Production", highlight: true },
                    { date: "Dec 18", person: "Jennifer L. from Creative" },
                    { date: "Dec 22", person: "Alex T. from Strategy" }
                ],
                anniversaries: [
                    { years: 5, person: "David K." },
                    { years: 3, person: "Lisa M." },
                    { years: 1, person: "Team Expansion Crew!" }
                ],
                shoutouts: [
                    { message: "Huge thanks to the edit team for crushing it on the Tech Corp project!", from: "Management" },
                    { message: "Props to IT for the smooth system upgrade!", from: "Everyone" }
                ]
            },
            apiEndpoint: null
        },

        articles: {
            title: "Industry Articles",
            icon: "📰",
            enabled: true,
            content: {
                trending: [
                    "The Rise of AI in Creative Production",
                    "2025 Design Trends to Watch",
                    "Sustainable Filmmaking Practices"
                ],
                mustReads: [
                    { source: "AdWeek", title: "Agencies of the Future" },
                    { source: "Campaign", title: "Digital First Strategies" },
                    { source: "Creative Review", title: "Best Campaigns 2024" }
                ]
            },
            apiEndpoint: null
        },

        ralphNews: {
            title: "RALPH News Network",
            icon: "📢",
            enabled: true,
            content: {
                breaking: [
                    { headline: "New Office Space Opening Q1 2025!", live: true },
                    { headline: "Award Win: Best Campaign at Industry Awards", live: false },
                    { headline: "Client Win: Major Automotive Account", live: false }
                ],
                updates: [
                    "New Equipment in Studio B",
                    "Holiday Party December 20th",
                    "Q4 Numbers Looking Strong!"
                ]
            },
            apiEndpoint: null
        },

        suggestions: {
            title: "Digital Suggestion Box",
            icon: "💭",
            enabled: true,
            content: {
                recentSuggestions: [
                    { idea: "Coffee machine upgrade", status: "APPROVED" },
                    { idea: "Flexible Friday hours", status: "IN REVIEW" },
                    { idea: "Pet-friendly office days", status: "CONSIDERING" }
                ]
            },
            apiEndpoint: null,
            submitEndpoint: null // Set to your API URL for form submissions
        },

        announcements: {
            title: "System Announcements",
            icon: "📣",
            enabled: true,
            content: {
                important: [
                    "System maintenance scheduled for Saturday 2:00 AM",
                    "Please save all work before Friday EOD"
                ],
                general: [
                    "Parking lot B closed for repairs this week",
                    "New health benefits info session Thursday",
                    "Kitchen renovation complete - enjoy!"
                ]
            },
            apiEndpoint: null
        },

        links: {
            title: "Quick Links Directory",
            icon: "🔗",
            enabled: true,
            content: {
                internal: [
                    { name: "TIMESHEET SYSTEM", url: "#" },
                    { name: "PROJECT TRACKER", url: "#" },
                    { name: "EXPENSE REPORTS", url: "#" },
                    { name: "IT HELPDESK", url: "#" }
                ],
                external: [
                    { name: "CLIENT PORTAL", url: "#" },
                    { name: "VENDOR DATABASE", url: "#" },
                    { name: "STOCK FOOTAGE", url: "#" }
                ]
            },
            apiEndpoint: null
        },

        innovation: {
            title: "Innovation Lab Updates",
            icon: "💡",
            enabled: true,
            content: {
                experiments: [
                    { name: "VR Production Pipeline - Phase 2", progress: 60 },
                    { name: "AI-Assisted Editing Tools", progress: 40 },
                    { name: "Real-time Rendering System", progress: 80 }
                ],
                nextSession: {
                    topic: "Future of Motion Graphics",
                    speaker: "Guest from Pixar"
                }
            },
            apiEndpoint: null
        },

        resources: {
            title: "Resource Center",
            icon: "📁",
            enabled: true,
            content: {
                documents: [
                    "Brand Guidelines v3.2",
                    "Employee Handbook 2024",
                    "Creative Best Practices",
                    "Client Onboarding Guide"
                ],
                templates: [
                    "Presentation Template",
                    "Project Brief Template",
                    "Invoice Template"
                ],
                training: [
                    "New Software Tutorials",
                    "Client Communication 101",
                    "Project Management Basics"
                ]
            },
            apiEndpoint: null
        }
    },

    // API Configuration
    api: {
        baseUrl: "", // Set your base API URL here
        headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers here
        },
        refreshInterval: 60000, // Refresh content every 60 seconds
        retryAttempts: 3,
        timeout: 5000
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CMS_CONFIG;
}