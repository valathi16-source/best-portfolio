import express from 'express';

const router = express.Router();

/**
 * Intelligent Portfolio Knowledge Base for Fallback Mode
 * Generates context-aware, informative, sci-fi responses when no external AI key is set.
 */
function getLocalKnowledgeResponse(userMessage) {
  const query = userMessage.toLowerCase().trim();

  // Greetings
  if (query.match(/^(hi|hello|hey|greetings|hola|namaste|vanakkam)/)) {
    return (
      "Greetings, explorer! I am Nova, Valathi's personal cybernetic assistant. " +
      "I am synchronized with Valathi's portfolio databanks. You can ask me about Valathi's skills, " +
      "projects, background in React and Python, or how to get in touch!"
    );
  }

  // Who is Valathi / About
  if (query.includes('who is') || query.includes('about') || query.includes('valathi') || query.includes('tell me about')) {
    return (
      "Valathi is an aspiring developer focused on building high-performance web applications and automated cyber-systems. " +
      "Specializing in modern React engineering, Python automation scripts, Linux environment management, and ethical cybersecurity fundamentals. " +
      "Valathi's core philosophy is: 'Building the Future, One Line at a Time.'"
    );
  }

  // Skills
  if (query.includes('skill') || query.includes('tech stack') || query.includes('technolog') || query.includes('languages') || query.includes('stack')) {
    return (
      "Valathi's technical arsenal comprises:\n" +
      "• Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite\n" +
      "• Backend & Scripting: Python, REST APIs, Node.js, Express, Bash shell scripting\n" +
      "• Systems & Tools: Linux (Ubuntu/Debian), Git, GitHub, VS Code\n" +
      "• Security & AI: Ethical Cybersecurity basics, OWASP guidelines, and Local AI assistants.\n" +
      "You can explore interactive progress bars in the Skills section above!"
    );
  }

  // Projects
  if (query.includes('project') || query.includes('work') || query.includes('built') || query.includes('portfolio') || query.includes('show me')) {
    return (
      "Featured initiatives in Valathi's archive include:\n" +
      "1. Futuristic Cyber Portfolio — Command center interface with 3D effects, interactive terminal, and voice assistant.\n" +
      "2. Linux Helper & System Toolkit — Automated POSIX CLI for hardware telemetry, log hygiene, and backup daemons.\n" +
      "3. Nova Cyber AI Assistant — Voice-driven companion integrating Web Speech APIs and generative backends.\n" +
      "4. Python Automation Suite — Batch data pipeline, web scraping bots, and webhook notification triggers.\n" +
      "Scroll down to the Projects section to filter by technology or view live source code!"
    );
  }

  // Contact
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('reach') || query.includes('message')) {
    return (
      "You can reach Valathi through several secure frequencies:\n" +
      "• Email: valathi.developer@example.com\n" +
      "• GitHub: github.com/valathi\n" +
      "• LinkedIn: linkedin.com/in/valathi-dev\n" +
      "Or fill out the direct encrypted contact form at the bottom of this page!"
    );
  }

  // Resume / CV
  if (query.includes('resume') || query.includes('cv') || query.includes('download') || query.includes('education') || query.includes('degree')) {
    return (
      "Valathi's resume is available for immediate download in PDF format! " +
      "Click the 'Download Resume' button in the Hero section or type 'resume' in the interactive Hacker Terminal to retrieve it."
    );
  }

  // Linux / Terminal
  if (query.includes('linux') || query.includes('terminal') || query.includes('bash') || query.includes('shell')) {
    return (
      "Valathi is a passionate advocate for Linux and terminal workflows! " +
      "Try launching the built-in simulated Hacker Terminal by clicking the '>_ Terminal' button in the top navigation bar or pressing '~' on your keyboard. " +
      "You can run commands like 'help', 'skills', 'projects', and 'matrix'!"
    );
  }

  // Python
  if (query.includes('python') || query.includes('automation')) {
    return (
      "Python is one of Valathi's primary languages for automation, file manipulation, " +
      "web scraping with BeautifulSoup and Selenium, and backend services."
    );
  }

  // React / Frontend
  if (query.includes('react') || query.includes('frontend') || query.includes('css') || query.includes('tailwind')) {
    return (
      "Valathi crafts responsive, futuristic frontends with React, Vite, and Tailwind CSS. " +
      "This entire website demonstrates smooth Framer Motion animations, glassmorphic UI, and Web Speech integration!"
    );
  }

  // Cybersecurity
  if (query.includes('security') || query.includes('cyber') || query.includes('hack')) {
    return (
      "Valathi studies ethical cybersecurity fundamentals, focusing on network defense, " +
      "safe authentication practices, input sanitization, and defensive hygiene."
    );
  }

  // Default intelligent fallback
  return (
    `Nova query processed: "${userMessage}". While in local knowledge-base mode, I can provide direct intel on Valathi's skills, projects, contact frequencies, or resume download. Try asking: "What skills are available?" or "Show me the projects."`
  );
}

// POST /api/chat
router.post('/', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  // 1. Try Google Gemini if key is provided and not default placeholder
  if (geminiKey && geminiKey !== 'your_gemini_api_key_here' && process.env.AI_PROVIDER !== 'local') {
    try {
      const systemInstruction = 
        "You are Nova, an intelligent, sci-fi cybernetic assistant representing Valathi, an aspiring developer. " +
        "Valathi's core skills: React, JavaScript, HTML, CSS, Tailwind CSS, Python, Linux, Git, and Cybersecurity fundamentals. " +
        "Valathi's motto: 'Building the Future, One Line at a Time.' " +
        "Keep your answers helpful, friendly, concise, and lightly infused with futuristic sci-fi personality.";

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nVisitor: ${message}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 250,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return res.json({
            response: reply.trim(),
            source: 'gemini',
            isFallback: false,
          });
        }
      }
    } catch (err) {
      console.warn('[Nova Chat] Gemini API error, falling back to local engine:', err.message);
    }
  }

  // 2. Try OpenAI if key is provided and not placeholder
  if (openaiKey && openaiKey !== 'your_openai_api_key_here' && process.env.AI_PROVIDER !== 'local') {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: "You are Nova, an intelligent sci-fi cybernetic assistant representing Valathi, an aspiring developer skilled in React, Python, Linux, and cybersecurity. Keep responses concise, friendly, and futuristic."
            },
            ...history.slice(-4),
            { role: 'user', content: message }
          ],
          max_tokens: 200,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return res.json({
            response: reply.trim(),
            source: 'openai',
            isFallback: false,
          });
        }
      }
    } catch (err) {
      console.warn('[Nova Chat] OpenAI API error, falling back to local engine:', err.message);
    }
  }

  // 3. Built-in Smart Local Knowledge Base
  const localReply = getLocalKnowledgeResponse(message);
  return res.json({
    response: localReply,
    source: 'local_knowledge_base',
    isFallback: true,
  });
});

export default router;
