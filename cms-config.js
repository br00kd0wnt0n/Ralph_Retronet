/**
 * RALPH Retronet CMS Configuration
 * This file contains all configurable content for the intranet dashboard
 * Can be easily modified or connected to a backend CMS/API
 */

const CMS_CONFIG = {
    "system": {
        "version": "1.0",
        "companyName": "RALPH",
        "primaryColor": "#eb008b",
        "bootMessages": [
            "Loading system kernel...",
            "Initializing RALPH protocols...",
            "Checking security clearance...",
            "Loading user preferences...",
            "Shutting up Hassell...",
            "Starting creative services...",
            "Loading project database...",
            "Initializing communication modules...",
            "Checking for updates...",
            "Loading desktop environment...",
            "Starting RALPH SUPER-INTRANET...",
            "System ready!"
        ]
    },
    "chatbot": {
        "enabled": true,
        "title": "RALPH Assistant v1.0",
        "welcomeMessage": "Welcome to RALPH Super-Intranet!",
        "helpText": "Here's what you can do:\n► Click any desktop icon to open modules\n► Drag windows by their title bars\n► Minimize, maximize, or close windows\n► Submit suggestions in the Suggestion Box\n► Accept challenges\n► Check project pipelines and deadlines\n► Send shoutouts to team members",
        "openai": {
            "enabled": false,
            "apiKey": "",
            "model": "gpt-4",
            "temperature": 0.7,
            "maxTokens": 150,
            "systemPrompt": "You are the RALPH company assistant. You help employees with:\n- Company policies and procedures\n- Project information and deadlines\n- Technical support\n- Creative inspiration\n- Team collaboration\nAlways maintain a friendly, professional tone and embody RALPH's creative spirit.",
            "fallbackResponses": [
                "Processing request...",
                "That's interesting! Tell me more.",
                "System acknowledged.",
                "Roger that!",
                "Command received.",
                "Affirmative!"
            ]
        }
    },
    "modules": {
        "newBiz": {
            "title": "New Business Pipeline v2.0",
            "icon": "📊",
            "enabled": true,
            "content": {
                "header": "RALPH PIPELINE TRACKER 1.0",
                "warmLeads": [
                    {
                        "name": "BeReal",
                        "office": "NY",
                        "dueDate": "2024-12-30",
                        "deckLink": "https://docs.google.com/presentation/d/1VHzjDvXklQQbiWdrBr7W_6A0xSrV9Sr0jsNZKt7hgsc/edit?slide=id.g36e66b67ba9_0_222#slide=id.g36e66b67ba9_0_222",
                        "briefLink": ""
                    }
                ],
                "pitchesHappening": [
                    {
                        "name": "Global Tech Corp - Video Campaign",
                        "office": "LON",
                        "dueDate": "2024-12-20",
                        "deckLink": "",
                        "briefLink": ""
                    },
                    {
                        "name": "Fashion Brand X - Social Strategy",
                        "office": "LA",
                        "dueDate": "2024-12-22",
                        "deckLink": "",
                        "briefLink": ""
                    }
                ],
                "pitchSubmitted": [
                    {
                        "name": "Auto Company Z - Launch Film",
                        "office": "NY",
                        "dueDate": "2024-12-25",
                        "deckLink": "",
                        "briefLink": ""
                    }
                ],
                "pitchPresented": [
                    {
                        "name": "Beauty Brand Presentation",
                        "office": "LA",
                        "dueDate": "2024-12-18",
                        "deckLink": "",
                        "briefLink": ""
                    }
                ],
                "pitchWon": [
                    {
                        "name": "Entertainment Client RFP",
                        "office": "TK",
                        "dueDate": "2024-12-15",
                        "deckLink": "",
                        "briefLink": ""
                    }
                ]
            },
            "apiEndpoint": null
        },
        "premieres": {
            "title": "Project Premiere Calendar",
            "icon": "🎬",
            "enabled": true,
            "content": {
                "thisMonth": [
                    {
                        "date": "Dec 15",
                        "project": "Urban Dreams Documentary",
                        "liveLink": ""
                    },
                    {
                        "date": "Dec 20",
                        "project": "Holiday Campaign Launch",
                        "liveLink": ""
                    },
                    {
                        "date": "Dec 28",
                        "project": "Year-End Showcase",
                        "liveLink": ""
                    }
                ],
                "nextMonth": [
                    {
                        "date": "Jan 10",
                        "project": "New Product Launch Film",
                        "liveLink": ""
                    },
                    {
                        "date": "Jan 15",
                        "project": "Brand Refresh Campaign",
                        "liveLink": ""
                    },
                    {
                        "date": "Jan 25",
                        "project": "Super Bowl Teaser",
                        "liveLink": ""
                    }
                ]
            },
            "apiEndpoint": null
        },
        "challenge": {
            "title": "Challenges",
            "icon": "🎨",
            "enabled": true,
            "content": {
                "currentChallenge": {
                    "month": "DECEMBER",
                    "theme": "Retro Future",
                    "description": "Create a 30-second concept using only 8-bit graphics and chiptune music!",
                    "prize": "🏆 Golden Pixel Award + Extra PTO Day"
                },
                "lastWinner": {
                    "name": "Sarah M.",
                    "concept": "Neon Dreams"
                }
            },
            "apiEndpoint": null
        },
        "shoutouts": {
            "title": "Shoutouts & Celebrations",
            "icon": "🎉",
            "enabled": true,
            "content": {
                "birthdays": [
                    {
                        "date": "Today",
                        "person": "Mike R. from Production",
                        "highlight": true
                    },
                    {
                        "date": "Dec 18",
                        "person": "Jennifer L. from Creative"
                    },
                    {
                        "date": "Dec 22",
                        "person": "Alex T. from Strategy"
                    }
                ],
                "anniversaries": [
                    {
                        "years": 5,
                        "person": "David K."
                    },
                    {
                        "years": 3,
                        "person": "Lisa M."
                    },
                    {
                        "years": 1,
                        "person": "Team Expansion Crew!"
                    }
                ],
                "shoutouts": [
                    {
                        "message": "Huge thanks to the edit team for crushing it on the Tech Corp project!",
                        "from": "Management"
                    },
                    {
                        "message": "Props to IT for the smooth system upgrade!",
                        "from": "Everyone"
                    }
                ]
            },
            "apiEndpoint": null
        },
        "articles": {
            "title": "Industry Articles",
            "icon": "📰",
            "enabled": true,
            "content": {
                "trending": [
                    "The Rise of AI in Creative Production",
                    "2025 Design Trends to Watch",
                    "Sustainable Filmmaking Practices"
                ],
                "mustReads": [
                    {
                        "source": "AdWeek",
                        "title": "Agencies of the Future"
                    },
                    {
                        "source": "Campaign",
                        "title": "Digital First Strategies"
                    },
                    {
                        "source": "Creative Review",
                        "title": "Best Campaigns 2024"
                    }
                ]
            },
            "apiEndpoint": null
        },
        "ralphNews": {
            "title": "RALPH News Network",
            "icon": "📢",
            "enabled": true,
            "content": {
                "breaking": [
                    {
                        "headline": "New Office Space Opening Q1 2025!",
                        "live": true
                    },
                    {
                        "headline": "Award Win: Best Campaign at Industry Awards",
                        "live": false
                    },
                    {
                        "headline": "Client Win: Major Automotive Account",
                        "live": false
                    }
                ],
                "updates": [
                    "New Equipment in Studio B",
                    "Holiday Party December 20th",
                    "Q4 Numbers Looking Strong!"
                ]
            },
            "apiEndpoint": null
        },
        "suggestions": {
            "title": "Digital Suggestion Box",
            "icon": "💭",
            "enabled": true,
            "content": {
                "recentSuggestions": [
                    {
                        "idea": "Coffee machine upgrade",
                        "status": "APPROVED"
                    },
                    {
                        "idea": "Flexible Friday hours",
                        "status": "IN REVIEW"
                    },
                    {
                        "idea": "Pet-friendly office days",
                        "status": "CONSIDERING"
                    }
                ]
            },
            "apiEndpoint": null,
            "submitEndpoint": null
        },
        "announcements": {
            "title": "System Announcements",
            "icon": "📣",
            "enabled": true,
            "content": {
                "important": [
                    "System maintenance scheduled for Saturday 2:00 AM",
                    "Please save all work before Friday EOD"
                ],
                "general": [
                    "Parking lot B closed for repairs this week",
                    "New health benefits info session Thursday",
                    "Kitchen renovation complete - enjoy!"
                ]
            },
            "apiEndpoint": null
        },
        "links": {
            "title": "Quick Links Directory",
            "icon": "🔗",
            "enabled": true,
            "content": {
                "internal": [
                    {
                        "name": "TIMESHEET SYSTEM",
                        "url": "#"
                    },
                    {
                        "name": "PROJECT TRACKER",
                        "url": "#"
                    },
                    {
                        "name": "EXPENSE REPORTS",
                        "url": "#"
                    },
                    {
                        "name": "IT HELPDESK",
                        "url": "#"
                    }
                ],
                "external": [
                    {
                        "name": "CLIENT PORTAL",
                        "url": "#"
                    },
                    {
                        "name": "VENDOR DATABASE",
                        "url": "#"
                    },
                    {
                        "name": "STOCK FOOTAGE",
                        "url": "#"
                    }
                ]
            },
            "apiEndpoint": null
        },
        "innovation": {
            "title": "Innovation Lab Updates",
            "icon": "💡",
            "enabled": true,
            "content": {
                "experiments": [
                    {
                        "name": "ralph Canvas",
                        "progress": 60,
                        "url": "https://ralph-visual-canvas-production.up.railway.app/"
                    },
                    {
                        "name": "AI-Assisted Editing Tools",
                        "progress": 40,
                        "url": ""
                    },
                    {
                        "name": "Real-time Rendering System",
                        "progress": 80,
                        "url": ""
                    }
                ],
                "nextSession": {
                    "topic": "Future of Motion Graphics",
                    "speaker": "Guest from Pixar"
                }
            },
            "apiEndpoint": null
        },
        "resources": {
            "title": "Resource Center",
            "icon": "📁",
            "enabled": true,
            "content": {
                "documents": [
                    "Brand Guidelines v3.2",
                    "Employee Handbook 2024",
                    "Creative Best Practices",
                    "Client Onboarding Guide"
                ],
                "templates": [
                    "Presentation Template",
                    "Project Brief Template",
                    "Invoice Template"
                ],
                "training": [
                    "New Software Tutorials",
                    "Client Communication 101",
                    "Project Management Basics"
                ]
            },
            "apiEndpoint": null
        },
        "music": {
            "title": "Music Library",
            "icon": "🎵",
            "enabled": false,
            "content": {
                "tracks": [
                    {
                        "id": 1,
                        "title": "Kawaii Kitsune",
                        "artist": "Kevin MacLeod",
                        "file": "music/kawaii-kitsune-kevin-macleod-main-version-7984-04-02.mp3",
                        "duration": "4:02",
                        "uploadDate": "2024-08-19"
                    },
                    {
                        "id": 2,
                        "title": "Mirthaflare",
                        "artist": "Ian Aisling",
                        "file": "music/mirthaflare-ian-aisling-main-version-22101-02-36.mp3",
                        "duration": "2:36",
                        "uploadDate": "2024-08-19"
                    }
                ],
                "totalTracks": 2,
                "totalDuration": "6:38"
            },
            "apiEndpoint": null
        },
        "sharing": {
            "title": "Weekly Share Challenge",
            "icon": "📲",
            "enabled": true,
            "content": {
                "weekOf": "August 20, 2024",
                "giftCardAmount": "$25",
                "items": [
                    {
                        "id": 1,
                        "type": "Instagram Post",
                        "title": "Behind the Scenes at RALPH Studio",
                        "description": "Check out our creative process in action!",
                        "thumbnail": "https://via.placeholder.com/300x200/EB008B/FFFFFF?text=RALPH+BTS",
                        "shareUrl": "https://instagram.com/p/example1",
                        "platform": "Instagram"
                    },
                    {
                        "id": 2,
                        "type": "TikTok Video",
                        "title": "Quick Design Tips from Our Team",
                        "description": "30-second design hack that will blow your mind",
                        "thumbnail": "https://via.placeholder.com/300x200/31BDBF/FFFFFF?text=Design+Tips",
                        "shareUrl": "https://tiktok.com/@ralph/video/example2",
                        "platform": "TikTok"
                    },
                    {
                        "id": 3,
                        "type": "Substack Article",
                        "title": "The Future of Creative Agencies",
                        "description": "Our latest thoughts on industry trends and innovation",
                        "thumbnail": "https://via.placeholder.com/300x200/F16524/FFFFFF?text=Future+Agency",
                        "shareUrl": "https://ralph.substack.com/p/future-creative-agencies",
                        "platform": "Substack"
                    }
                ]
            },
            "apiEndpoint": null
        }
    },
    "api": {
        "baseUrl": "",
        "headers": {
            "Content-Type": "application/json"
        },
        "refreshInterval": 60000,
        "retryAttempts": 3,
        "timeout": 5000
    }
};

// Make available globally for browser
if (typeof window !== 'undefined') {
    window.CMS_CONFIG = CMS_CONFIG;
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CMS_CONFIG;
}
