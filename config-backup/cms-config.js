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
        "ralphWorldUrl": "https://ralph-world-frontend.vercel.app/",
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
        "welcomeMessage": "Welcome to RALPH's Super-Intranet!",
        "helpText": "Here's what you can do:\n► Click any desktop icon to open modules\n► Drag windows by their title bars\n► Minimize, maximize, or close windows\n► Submit suggestions in the Suggestion Box\n► Submit pitches to quarterly competition\n► Check project pipelines and deadlines\n► Send shoutouts to team members",
        "introText": "I'm here to help with questions about RALPH, projects, or anything else you need assistance with.",
        "promptText": "Type your message below or ask me anything!",
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
            "title": "New Biz Pipe",
            "icon": "📊",
            "enabled": true,
            "description": "Track our business development pipeline from warm leads to won pitches. See upcoming meetings, proposal deadlines, and conversion progress.",
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
            "title": "Premiere Calendar",
            "icon": "🎬",
            "enabled": true,
            "description": "Stay up-to-date with all project premieres and launch dates. Track this month's debuts and plan for upcoming releases.",
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
        "pitchPlease": {
            "title": "Pitch, Please!",
            "icon": "💡",
            "enabled": true,
            "description": "Submit your innovative ideas to our quarterly pitch competition! Share your vision and compete for funding and development support.",
            "content": {
                "subtitle": "A quarterly competition where you can pitch almost anything you think is a winner",
                "currentQuarter": "Q1 2025",
                "deadline": "March 31, 2025",
                "theme": "Innovation & Growth",
                "prize": "Up to $50K",
                "currentSubmissions": 12,
                "daysLeft": 45
            },
            "apiEndpoint": null
        },
        "shoutouts": {
            "title": "Shoutouts",
            "icon": "🎉",
            "enabled": true,
            "description": "Celebrate team members and milestones! Check upcoming birthdays, work anniversaries, and share appreciation for great work.",
            "content": {
                "birthdays": [
                    {
                        "date": "Today",
                        "person": "Mike R. from Production",
                        "highlight": true
                    },
                    {
                        "date": "Dec 18",
                        "person": "Jennifer L. from Creative",
                        "highlight": false
                    },
                    {
                        "date": "Dec 22",
                        "person": "Alex T. from Strategy",
                        "highlight": false
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
            "description": "Stay informed with curated industry news and trends. Read must-have articles from top publications and trending topics.",
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
            "title": "Ralph News Network",
            "icon": "<span class=\"rnn-logo\">RNN</span>",
            "enabled": true,
            "description": "Breaking news and updates from across the RALPH network. Get the latest company announcements and industry insights.",
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
            "title": "Suggestion Box",
            "icon": "💭",
            "enabled": true,
            "description": "Share your ideas to improve our workplace and processes. See which suggestions are approved, under review, or being considered.",
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
            "title": "Announcements",
            "icon": "📣",
            "enabled": true,
            "description": "Important company updates and system notifications. Check critical announcements and general office information.",
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
            "title": "Quick Links",
            "icon": "🔗",
            "enabled": true,
            "description": "Fast access to essential tools and resources. Find internal systems, client portals, and external platforms you use daily.",
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
            "title": "Innovation Updates",
            "icon": "💡",
            "enabled": true,
            "description": "Explore cutting-edge projects and experimental tools. Track innovation lab progress and upcoming tech sessions.",
            "content": {
                "experiments": [
                    {
                        "name": "ralph Canvas",
                        "description": "Revolutionary visual synthesis platform combining AI with creative workflows",
                        "progress": 60,
                        "url": "https://ralph-visual-canvas-production.up.railway.app/",
                        "thumbnail": "https://via.placeholder.com/120x80/00ff00/000000?text=CANVAS",
                        "status": "ACTIVE"
                    },
                    {
                        "name": "AI-Assisted Editing Tools",
                        "description": "Next-generation video editing powered by machine learning algorithms",
                        "progress": 40,
                        "url": "",
                        "thumbnail": "https://via.placeholder.com/120x80/00ff41/000000?text=AI+EDIT",
                        "status": "DEV"
                    },
                    {
                        "name": "Real-time Rendering System",
                        "description": "Ultra-fast rendering engine for live production environments",
                        "progress": 80,
                        "url": "",
                        "thumbnail": "https://via.placeholder.com/120x80/00ff82/000000?text=RT+RENDER",
                        "status": "BETA"
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
            "title": "Resources",
            "icon": "📁",
            "enabled": true,
            "description": "Access brand guidelines, templates, and training materials. Your one-stop shop for company documents and learning resources.",
            "content": {
                "documents": [
                    {
                        "name": "Brand Guidelines v3.2",
                        "url": ""
                    },
                    {
                        "name": "Employee Handbook 2024",
                        "url": ""
                    },
                    {
                        "name": "Creative Best Practices",
                        "url": ""
                    },
                    {
                        "name": "Client Onboarding Guide",
                        "url": ""
                    }
                ],
                "templates": [
                    {
                        "name": "Presentation Template",
                        "url": ""
                    },
                    {
                        "name": "Project Brief Template",
                        "url": ""
                    },
                    {
                        "name": "Invoice Template",
                        "url": ""
                    }
                ],
                "training": [
                    {
                        "name": "New Software Tutorials",
                        "url": ""
                    },
                    {
                        "name": "Client Communication 101",
                        "url": ""
                    },
                    {
                        "name": "Project Management Basics",
                        "url": ""
                    }
                ]
            },
            "apiEndpoint": null
        },
        "music": {
            "icon": "🎵",
            "enabled": false,
            "content": {
                "tracks": [],
                "totalTracks": 0,
                "totalDuration": "0:00"
            },
            "apiEndpoint": null
        },
        "sharing": {
            "icon": "📲",
            "enabled": true,
            "content": {
                "weekOf": "December 23, 2024",
                "giftCardAmount": "$25",
                "items": [
                    {
                        "id": 1,
                        "type": "Instagram Post",
                        "platform": "Instagram",
                        "title": "Behind the Scenes at RALPH Studio",
                        "description": "Check out our creative process in action!",
                        "thumbnail": "https://via.placeholder.com/300x200/EB008B/FFFFFF?text=RALPH+BTS",
                        "shareUrl": "https://instagram.com/p/example1"
                    },
                    {
                        "id": 2,
                        "type": "TikTok Video",
                        "platform": "TikTok",
                        "title": "Quick Design Tips from Our Team",
                        "description": "30-second design hack that will blow your mind",
                        "thumbnail": "https://via.placeholder.com/300x200/31BDBF/FFFFFF?text=Design+Tips",
                        "shareUrl": "https://tiktok.com/@ralph/video/example2"
                    },
                    {
                        "id": 3,
                        "type": "Substack Article",
                        "platform": "Substack",
                        "title": "The Future of Creative Agencies",
                        "description": "Our latest thoughts on industry trends and innovation",
                        "thumbnail": "https://via.placeholder.com/300x200/F16524/FFFFFF?text=Future+Agency",
                        "shareUrl": "https://ralph.substack.com/p/future-creative-agencies"
                    }
                ]
            },
            "apiEndpoint": null
        }
    },
    "infoPanel": {
        "title": "📊 RALPH Intranet Info",
        "subtitle": "Version 2.0 | Built with ♥️ by the RALPH team",
        "welcome": {
            "title": "🏢 WELCOME TO RALPH'S RETRO INTRANET SYSTEM",
            "description": "This retro-inspired intranet brings together all your RALPH tools, updates, and team connections in one nostalgic interface. Navigate using desktop icons, drag windows around, and interact with content just like the good old days!"
        },
        "sections": [
            {
                "title": "🚀 How It Works",
                "icon": "var(--ralph-green)",
                "items": [
                    "**Desktop Icons:** Click any icon to open modules and tools",
                    "**Window System:** Drag, minimize, maximize, and organize your workspace",
                    "**Start Menu:** Access system tools and options",
                    "**Music Player:** Enjoy background tunes while you work",
                    "**World Clock:** Stay connected with global team members"
                ]
            },
            {
                "title": "🛠️ Built With",
                "icon": "var(--ralph-blue)",
                "description": "Our intranet combines modern functionality with retro aesthetics:",
                "items": [
                    "**Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript",
                    "**Design:** Windows 95-inspired UI with modern responsive features",
                    "**Content Management:** Dynamic CMS integration for easy updates",
                    "**Security:** Production-ready authentication and data protection",
                    "**Performance:** Optimized for fast loading and smooth interactions"
                ]
            },
            {
                "title": "📊 Key Features",
                "icon": "var(--ralph-orange)",
                "features": [
                    {
                        "title": "💼 Business Pipeline",
                        "color": "var(--ralph-pink)",
                        "description": "Track projects from leads to completion"
                    },
                    {
                        "title": "💡 Innovation Hub",
                        "color": "var(--ralph-green)",
                        "description": "Collaborate on cutting-edge projects"
                    },
                    {
                        "title": "📣 Announcements",
                        "color": "var(--ralph-blue)",
                        "description": "Stay updated with company news"
                    },
                    {
                        "title": "📝 Resources",
                        "color": "var(--ralph-yellow)",
                        "description": "Access documents and training materials"
                    }
                ]
            },
            {
                "title": "🔍 Fun Facts",
                "icon": "var(--ralph-brown)",
                "items": [
                    "The system uses over 15,000 lines of hand-crafted code",
                    "Window z-index management ensures perfect layering behavior",
                    "Dynamic content loading keeps information fresh and relevant",
                    "Pixel-perfect recreations of classic Windows UI elements",
                    "Responsive design works seamlessly on desktop, tablet, and mobile",
                    "Built-in security features protect sensitive company information"
                ]
            }
        ],
        "footer": {
            "title": "🌟 Have ideas for new features?",
            "message": "Use the Suggestion Box to share your thoughts and help make the intranet even better!"
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
