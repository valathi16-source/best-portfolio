/**
 * =======================================================================
 * VALATHI - CENTRAL PORTFOLIO CONFIGURATION
 * =======================================================================
 * Everything in this portfolio is driven by this configuration file.
 * Beginners: Simply update the values below to personalize your portfolio!
 * 
 * Instructions:
 * 1. Change your name, bio, and social links below.
 * 2. Update the `githubUsername` to your real GitHub handle.
 * 3. Update the skills and proficiency percentages to match your actual skills.
 * 4. Add your own projects or customize the sample projects.
 * 5. Replace `public/resume/Valathi_Resume.pdf` with your real resume.
 * =======================================================================
 */

export const PORTFOLIO_CONFIG = {
  // Personal Details
  developer: {
    name: "Valathi",
    role: "Aspiring Full-Stack & Cyber-Systems Developer",
    tagline: "Building the Future, One Line at a Time.",
    status: "SYSTEMS NOMINAL // READY TO CODE",
    location: "Tamil Nadu, India // Remote Available",
    email: "valathi.developer@example.com",
    avatar: "/images/valathi-profile.jpg",
    bio: [
      "I am an aspiring developer passionate about crafting high-performance web applications, automating complex workflows, and exploring the intersection of modern frontend engineering, Linux systems, and ethical cybersecurity.",
      "Driven by relentless curiosity, I spend my time building intuitive interfaces with React, writing automation scripts in Python, mastering terminal-first Linux workflows, and experimenting with local AI assistants.",
      "My mission is to engineer digital tools that feel futuristic, secure, and genuinely impactful."
    ],
    experienceLevel: "Aspiring Developer / Junior Engineer",
    availability: "Available for internships, junior full-stack roles, and open-source collaboration.",
  },

  // Social & External Links
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/valathi-dev",
    twitter: "https://twitter.com/valathi_dev",
    email: "mailto:valathi.developer@example.com",
    discord: "https://discord.com/users/valathi",
  },

  // GitHub API Integration Settings
  github: {
    // Set this to your actual GitHub username to automatically fetch your real repositories!
    // Example: "valathi", "torvalds", "facebook", etc.
    username: "valathi",
    maxRepos: 6,
    // When true, if the GitHub API returns no repos or hits rate-limit (60 req/hr unauthenticated),
    // friendly sample showcase cards will be displayed with a notice.
    enableFallback: true,
  },

  // Core Interest / Focus Areas for About Section
  focusAreas: [
    {
      id: "frontend",
      title: "Modern Web & React",
      icon: "Code2",
      description: "Crafting fluid, high-octane user interfaces with React, Vite, and Tailwind CSS with glassmorphic aesthetics and responsive architecture.",
      color: "cyan",
    },
    {
      id: "python",
      title: "Python & Automation",
      icon: "Terminal",
      description: "Automating repetitive workflows, web scraping, and building CLI utility scripts with Python to boost developer productivity.",
      color: "purple",
    },
    {
      id: "linux",
      title: "Linux & Systems",
      icon: "Server",
      description: "Deep affinity for Linux environments, Bash shell scripting, process management, and POSIX terminal workflows.",
      color: "lime",
    },
    {
      id: "security",
      title: "Ethical Cybersecurity",
      icon: "ShieldCheck",
      description: "Understanding network fundamentals, OWASP security best practices, safe credential management, and defensive systems.",
      color: "cyan",
    },
    {
      id: "ai",
      title: "Local AI & Assistants",
      icon: "Cpu",
      description: "Experimenting with lightweight local LLMs, prompt engineering, speech recognition APIs, and conversational user interfaces.",
      color: "purple",
    },
    {
      id: "version-control",
      title: "Git & Collaborative Code",
      icon: "GitBranch",
      description: "Clean commit conventions, branch management, pull requests, and continuous learning through open-source codebases.",
      color: "lime",
    },
  ],

  // Skills Section
  // IMPORTANT NOTICE: These proficiency percentages are sample starter values.
  // Be sure to adjust them to truthfully reflect your actual skill level!
  skills: [
    {
      name: "HTML5 & Semantic Markup",
      category: "Frontend",
      percentage: 90,
      icon: "FileCode",
      level: "Proficient",
      description: "Accessible, semantic structure, SEO best practices, and modern web standards.",
    },
    {
      name: "CSS3 & Tailwind CSS",
      category: "Frontend",
      percentage: 85,
      icon: "Palette",
      level: "Advanced",
      description: "Responsive layouts, Flexbox/Grid, custom cyber themes, and glassmorphism styling.",
    },
    {
      name: "JavaScript (ES6+)",
      category: "Frontend",
      percentage: 80,
      icon: "Braces",
      level: "Intermediate",
      description: "Async/await, DOM manipulation, promises, event-driven programming, and API integration.",
    },
    {
      name: "React.js",
      category: "Frontend",
      percentage: 78,
      icon: "Atom",
      level: "Intermediate",
      description: "Hooks, component lifecycles, state management, modular architecture, and Vite.",
    },
    {
      name: "Python",
      category: "Backend & Scripting",
      percentage: 75,
      icon: "Binary",
      level: "Intermediate",
      description: "Object-oriented scripting, automation, RESTful services, and data processing.",
    },
    {
      name: "Linux & Bash",
      category: "Systems & DevOps",
      percentage: 72,
      icon: "TerminalSquare",
      level: "Intermediate",
      description: "Command-line navigation, shell scripting, permissions, cron jobs, and Ubuntu/Debian.",
    },
    {
      name: "Git & GitHub",
      category: "Systems & DevOps",
      percentage: 82,
      icon: "GitFork",
      level: "Proficient",
      description: "Version control, branching, merge conflict resolution, and repository management.",
    },
    {
      name: "Cybersecurity Fundamentals",
      category: "Security & AI",
      percentage: 65,
      icon: "ShieldAlert",
      level: "Foundational",
      description: "Network basics, OWASP top 10 awareness, symmetric/asymmetric encryption, and defensive hygiene.",
    },
  ],

  // Advanced Project Showcase
  // NOTE: These are clearly labelled starter/sample templates for demonstration.
  // Replace these with your own real repositories and live demo URLs as you build them!
  projects: [
    {
      id: "futuristic-portfolio",
      title: "Futuristic Cyber Portfolio",
      category: "frontend",
      featured: true,
      isSample: false,
      badge: "Flagship Project",
      tagline: "High-octane sci-fi portfolio command center",
      description: "A futuristic developer portfolio featuring interactive 3D perspective cards, a simulated Unix hacker terminal, a speech-enabled AI assistant named Nova, and real-time GitHub integration.",
      techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Web Speech API", "Express"],
      demoUrl: "#home",
      githubUrl: "https://github.com/valathi/valathi-premium-portfolio",
      image: "/images/project-portfolio.svg",
      metrics: "Sub-1s Load Time // 100% Responsive // Full A11y",
      highlights: [
        "Simulated hacker terminal with history and custom command parser",
        "Dual voice engine: Web Speech recognition & spoken audio synthesis",
        "Cyberpunk glassmorphic design with animated orbital rings and dark/light themes"
      ]
    },
    {
      id: "linux-helper-toolkit",
      title: "Linux Helper & System Toolkit",
      category: "systems",
      featured: true,
      isSample: true,
      badge: "Sample Project Template",
      tagline: "Automated POSIX diagnostics and maintenance CLI",
      description: "A modular Python and Bash CLI utility that streamlines Linux workstation maintenance, monitors system hardware metrics, manages background daemons, and automates daily backup routines.",
      techStack: ["Python", "Bash", "Linux", "PSUtil", "Cron", "Systemd"],
      demoUrl: "https://github.com/valathi",
      githubUrl: "https://github.com/valathi",
      image: "/images/project-linux.svg",
      metrics: "Cross-distro compatible // Zero external dependencies",
      highlights: [
        "Real-time CPU, RAM, and Disk I/O telemetry reporting",
        "Automated log file rotation and cache purging routines",
        "Configurable backup snapshotting to local or remote storage"
      ]
    },
    {
      id: "personal-ai-assistant",
      title: "Nova Cyber AI Assistant",
      category: "ai-security",
      featured: true,
      isSample: true,
      badge: "Sample Project Template",
      tagline: "Autonomous personal assistant with voice & terminal UI",
      description: "An AI-powered developer companion designed to answer technical documentation queries, summarize system logs, and trigger desktop shortcuts via voice commands and a RESTful backend.",
      techStack: ["Node.js", "Express", "Web Speech API", "Google Gemini", "Tailwind CSS"],
      demoUrl: "#contact",
      githubUrl: "https://github.com/valathi",
      image: "/images/project-ai.svg",
      metrics: "Multi-modal input // Fallback knowledge engine",
      highlights: [
        "Real-time speech-to-text with continuous browser audio stream",
        "Intelligent intent classification with customizable knowledge base",
        "Secure server-side API proxy preventing frontend key leakage"
      ]
    },
    {
      id: "python-automation-tools",
      title: "Python Automation Suite",
      category: "automation",
      featured: true,
      isSample: true,
      badge: "Sample Project Template",
      tagline: "Batch data extraction, file sorting & notification bot",
      description: "A collection of pragmatic automation scripts that organize incoming downloads by MIME type, scrape tech newsletters, and send automated webhook notifications to Discord or Telegram.",
      techStack: ["Python", "BeautifulSoup4", "Requests", "Selenium", "Asyncio"],
      demoUrl: "https://github.com/valathi",
      githubUrl: "https://github.com/valathi",
      image: "/images/project-python.svg",
      metrics: "500+ tasks automated // 99.8% execution reliability",
      highlights: [
        "Headless browser automation with dynamic content scraping",
        "Smart folder watchdog triggering instant file sorting",
        "Discord bot integration for status alerts and failure recovery"
      ]
    },
  ],

  // Project Categories for Filter Bar
  projectCategories: [
    { id: "all", label: "All Systems" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "systems", label: "Linux & Systems" },
    { id: "automation", label: "Python & Automation" },
    { id: "ai-security", label: "AI & CyberSec" },
  ],

  // Hacker Terminal Simulated Commands Configuration
  terminal: {
    hostname: "valathi@cyber-core",
    welcomeMessage: [
      "VALATHI CYBERNETIC OS // KERNEL v5.19-GENESIS",
      "Type 'help' to inspect available system commands.",
      "Press 'ESC' or type 'exit' to terminate session.",
      "============================================================"
    ],
  },

  // AI Chatbot (Nova) Presets & Suggested Prompts
  nova: {
    botName: "Nova",
    botVersion: "v3.2 Cyber-Engine",
    avatar: "/images/nova-avatar.svg",
    welcomeGreeting: "Greetings, traveler! I am Nova, Valathi's cybernetic AI assistant. How can I assist your exploration of Valathi's work and technical arsenal today?",
    suggestedQuestions: [
      "Tell me about Valathi.",
      "What skills are available?",
      "Show me the projects.",
      "How can I contact Valathi?",
      "How can I download the resume?"
    ],
  },

  // Resume Information (Used for download & preview)
  resume: {
    downloadPath: "/resume/Valathi_Resume.pdf",
    filename: "Valathi_Developer_Resume.pdf",
    lastUpdated: "October 2026",
    sections: {
      education: [
        {
          degree: "Bachelor of Technology / Computer Science & Engineering",
          institution: "Anna University Affiliated College",
          period: "2023 - Present",
          details: "Focused on Data Structures, Algorithms, Linux Operating Systems, and Modern Software Engineering."
        }
      ],
      certifications: [
        { name: "Responsive Web Design Certification", issuer: "freeCodeCamp", year: "2024" },
        { name: "Linux Fundamentals & Shell Scripting", issuer: "Open-Source Course", year: "2024" },
        { name: "Python for Problem Solving", issuer: "Developer Program", year: "2024" }
      ]
    }
  }
};
