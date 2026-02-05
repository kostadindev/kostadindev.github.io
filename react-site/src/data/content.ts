export const personalInfo = {
  name: "Kostadin Devedzhiev",
  email: "kostadin.g.devedzhiev@gmail.com",
  tagline: "Human-Inspired AI | ML | UI",
  cvUrl: "./documents/cv.pdf",
  avatar: "./images/headshot.jpg",
  bio: [
    `I'm a postgraduate student at the University of Cambridge, where I study human-inspired AI. My thesis focuses on designing multi-agent orchestration under real-world conditions, such as varying expertise, costs, and availability. Additionally, I am pursuing research on multi-agent reinforcement learning for political alignment. In the future, I aim to explore how such technologies can support ecological conservation through intelligent remote sensing and monitoring.`,
    `Previously, I worked as a Software Engineer at Stellar Cyber in San Jose, California, where I developed AI-driven interfaces for threat hunting and human-augmented autonomous cybersecurity operations powered by agentic AI. I'm also the creator of GONEXT, a generative AI platform that delivers personalized analytics for League of Legends players.`,
    `In my free time, I enjoy being outdoors in nature, going to music festivals, and playing racquet sports.`
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kostadin-dev/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/KostadinDev", icon: "github" },
    { name: "Spotify", url: "https://open.spotify.com/user/4y1al16ad6q40hy0bm6xejks0", icon: "spotify" },
    { name: "LeetCode", url: "https://leetcode.com/u/user9852My/", icon: "code" },
  ]
};

export const currentWork = [
  {
    title: "GONEXT.lol",
    description: "A League of Legends analytics platform built on a multi-agent LLM architecture. It provides transparent reasoning via a thinking trail and MCP logs, calculating detailed aggregate statistics from match history. The system offers context-aware strategies and optimized item builds based on live game states, while supporting dynamic conversational inquiries about anything game related, patches, players, and tournaments.",
    tags: ["GenAI", "Agentic AI", "RAG"],
    links: [
      { type: "website", url: "https://gonext.lol" },
      { type: "github", url: "https://github.com/KostadinDev/gonext" }
    ],
    image: "./images/gonext-cover-chat.webp"
  },
  {
    title: "League of Legends MCP Server",
    description: "This open-source Model Context Protocol (MCP) server empowers LLMs with comprehensive access to League of Legends game data through the Riot Games API. It features over 35 tools and resources for retrieving player statistics, match history, champion information, tournament data, and real-time game monitoring.",
    tags: ["MCP", "Agentic AI", "GenAI"],
    links: [
      { type: "github", url: "https://github.com/kostadindev/League-of-Legends-MCP" },
      { type: "docker", url: "https://hub.docker.com/r/kostadindev/league-mcp" },
      { type: "pypi", url: "https://pypi.org/project/league-mcp/" }
    ],
    commands: ["docker pull kostadindev/league-mcp", "pip install league-mcp"],
    image: "https://github.com/user-attachments/assets/81ff5484-f747-431d-ac9c-c04933339b82"
  },
  {
    title: "Knowledge Base Builder",
    description: "Python package for converting diverse content into a search-engine-friendly knowledge base. It effortlessly ingests files (PDFs, DOCXs, spreadsheets), websites, and GitHub repositories, then leverages LLMs to generate a Markdown knowledge base. Ideal for creating structured and crawlable formats like llms.txt.",
    tags: ["GenAI", "RAG"],
    links: [
      { type: "pypi", url: "https://pypi.org/project/knowledge-base-builder/" },
      { type: "github", url: "https://github.com/kostadindev/knowledge-base-builder" }
    ],
    commands: ["pip install knowledge-base-builder"],
    image: "./images/kbb.png"
  }
];

export const projects = [
  {
    title: "Recursive QA",
    description: "An NLP annotation framework that replaces conventional labeling processes with an intuitive question-answering method. Leveraging constituency parse trees, the system guides annotators by generating targeted question-answer pairs.",
    tags: ["NLP", "Human-in-the-Loop"],
    category: ["nlp", "hitl"],
    links: [{ type: "github", url: "https://github.com/KostadinDev/Recursive-QA" }],
    image: "./images/recursiveqa-cover.jpg"
  },
  {
    title: "I Want to Redistrict",
    description: "A political science application developed to create and evaluate state districting plans through statistical analysis. Its primary purpose is to identify gerrymandering and support the generation of equitable district maps using 2020 Census data.",
    tags: ["High Performance Computing", "Human-in-the-Loop", "Political Science"],
    category: ["hpc", "hitl"],
    links: [],
    image: "./images/redistrict.png"
  },
  {
    title: "Deep Gestures",
    description: "A comprehensive pipeline for gesture recognition on the Arduino Nano 33 BLE Sense microcontroller. The pipeline leverages the device's integrated 3D accelerometer, gyroscope, and magnetometer sensors.",
    tags: ["Computer Vision", "IoT"],
    category: ["cv", "iot"],
    links: [{ type: "github", url: "https://github.com/KostadinDev/deep-gestures" }],
    image: "./images/deep-gestures-image.jpg"
  },
  {
    title: "Symbiotic Learning",
    description: "A human-in-the-loop image annotation system created to identify and classify invasive species in aerial drone imagery, contributing to the conservation of Hawaii's ecosystems.",
    tags: ["Computer Vision", "Human-in-the-Loop", "Ecological Conservation"],
    category: ["cv", "hitl"],
    links: [{ type: "article", url: "https://hilo.hawaii.edu/chancellor/stories/2020/08/11/students-research-into-artificial-intelligence/" }],
    image: "https://hilo.hawaii.edu/chancellor/stories/wp-content/uploads/2020/08/Project-2-800x471.jpg"
  }
];

export const publications = [
  {
    title: "Motional EMF Generated by Squeezing an Elliptical Conducting Loop",
    authors: "P-M Binder, Kostadin G Devedzhiev, Alexandra T Runyan",
    journal: "European Journal of Physics, European Physical Society",
    year: 2020,
    doi: "https://dx.doi.org/10.1088/1361-6404/abb066",
    tags: ["Physics", "Numerical Analysis"],
    description: "A numerical approach for accurately calculating the motional electromotive force (EMF) induced in elliptical loops as they move within a uniform magnetic field.",
    image: "./images/ellipses-white.png"
  }
];

export const education = [
  {
    institution: "University of Cambridge",
    degree: "Master of Philosophy in Human-Inspired AI",
    details: ["Cambridge AI Research Society", "Expected Graduation: June 2026"],
    link: "https://www.chia.cam.ac.uk/",
    logo: "https://www.cam.ac.uk/sites/default/files/secondary-logo-stacked.png"
  },
  {
    institution: "Stony Brook University",
    degree: "Bachelor of Science in Computer Science and Applied Mathematics & Statistics",
    details: [
      "Computer Science Honors Program",
      "Artificial Intelligence & Data Science Specialization",
      "Summa Cum Laude | 3.89/4.00 GPA"
    ],
    transcript: "./documents/sbu_transcript.pdf",
    logo: "https://images.credly.com/images/24977e6c-4f52-4579-b04f-0a39ae6cb39e/blob.png"
  },
  {
    institution: "University of Hawaii at Hilo",
    degree: "National Student Exchange Program",
    details: ["Computer Science Major | GPA: 3.97/4.00"],
    transcript: "./documents/uhh_transcript.pdf",
    logo: "https://studyhawaii.org/wp-content/uploads/2017/11/Hilo.jpg"
  }
];

export const skills = {
  "Programming Languages": ["Python", "JavaScript", "TypeScript"],
  "Frontend": ["Angular", "React", "Tailwind"],
  "Backend & APIs": ["FastAPI", "NodeJS", "Express", "Flask"],
  "Databases": ["MongoDB", "Elastic Search", "Pinecone", "PostgreSQL", "Redis"],
  "Data Science & ML": ["Pandas", "NumPy", "Scikit-learn", "Plotly"],
  "Deep Learning": ["PyTorch", "Hugging Face"],
  "AI Frameworks": ["LangChain", "LangGraph"],
  "DevOps": ["Docker"]
};

export const certificates = [
  {
    title: "IBM Generative AI Engineering",
    image: "https://images.credly.com/size/160x160/images/468eaf1a-197c-44e2-9bd1-2f75bb7b5feb/Coursera_20IBM_20Generative_20AI_20Engineering_20Prof_20Cert.png",
    link: "https://www.credly.com/users/kostadin-devedzhiev.e059b079"
  },
  {
    title: "MCP: Build Rich-Context AI Apps with Anthropic",
    image: "https://learn.deeplearning.ai/assets/dlai-logo.png",
    link: "https://learn.deeplearning.ai/accomplishments/b1ee6756-bc7a-45e1-83e8-ff376ae07c8c"
  },
  {
    title: "AI Agents in LangGraph",
    image: "https://learn.deeplearning.ai/assets/dlai-logo.png",
    link: "https://learn.deeplearning.ai/accomplishments/896e518d-07f3-4161-80b8-cb7d58ccc1c3"
  }
];

export const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Education", href: "#education" },
];
