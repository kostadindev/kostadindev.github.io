export const personalInfo = {
  name: "Kostadin Devedzhiev",
  email: "kostadin.g.devedzhiev@gmail.com",
  tagline: "Human-AI Orchestration | TRACE Lab, University of Cambridge",
  cvUrl: "./documents/cv.pdf",
  avatar: "./images/headshot.jpg",
  bio: [
    `I'm a postgraduate student at the Centre for Human-Inspired AI (CHIA), University of Cambridge, where I am part of the TRACE Lab advised by Professor Umang Bhatt. My research focuses on human-AI orchestration — designing multi-agent systems where AI agents and humans collaborate under real-world conditions, such as varying expertise, costs, and availability. I am building Tailor, a platform for designing workflows with built-in human oversight and governance controls for regulated industries.`,
    `Previously, I worked as a Software Engineer at Stellar Cyber in San Jose, California, where I developed AI-driven interfaces for threat hunting and human-augmented autonomous cybersecurity operations powered by agentic AI.`,
    `In my free time, I enjoy being outdoors in nature, going to music festivals, and playing racquet sports.`
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kostadin-dev/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/KostadinDev", icon: "github" },
    { name: "LeetCode", url: "https://leetcode.com/u/user9852My/", icon: "code" },
  ]
};

export const currentWork = [
  {
    title: "Tailor",
    description: "A human-AI orchestration platform for designing workflows where AI agents and humans collaborate seamlessly. Features a visual workflow builder, specialized AI agents, human-in-the-loop review, and four levels of governance controls — from autonomous AI to human-led — built for regulated industries like healthcare, finance, and legal.",
    tags: ["Human-AI Orchestration", "Agentic AI", "Human-in-the-Loop"],
    links: [
      { type: "website", url: "https://tailorworkflow.com" }
    ],
    image: "./images/tailor-cover.png"
  },
  {
    title: "MARL-Align",
    description: "A multi-agent reinforcement learning framework for LLM value alignment. Formalizes alignment as a decentralized POMDP and uses social welfare functions to train group-personalized language models. Evaluated on politically polarizing conversations, balancing individual user preferences with collective societal welfare through fairness-aware optimization.",
    tags: ["MARL", "LLM Alignment", "Social Choice Theory"],
    links: [],
    image: "./images/marl-align-cover.jpg"
  }
];

export const projects = [
  {
    title: "GONEXT.lol",
    description: "A League of Legends analytics platform built on a multi-agent LLM architecture. It provides transparent reasoning via a thinking trail and MCP logs, calculating detailed aggregate statistics from match history. The system offers context-aware strategies and optimized item builds based on live game states, while supporting dynamic conversational inquiries about anything game related, patches, players, and tournaments.",
    tags: ["GenAI", "Agentic AI", "RAG"],
    category: ["genai", "agentic"],
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
    category: ["mcp", "agentic"],
    links: [
      { type: "github", url: "https://github.com/kostadindev/League-of-Legends-MCP" },
      { type: "docker", url: "https://hub.docker.com/r/kostadindev/league-mcp" },
      { type: "pypi", url: "https://pypi.org/project/league-mcp/" }
    ],
    image: "https://github.com/user-attachments/assets/81ff5484-f747-431d-ac9c-c04933339b82"
  },
  {
    title: "Knowledge Base Builder",
    description: "Python package for converting diverse content into a search-engine-friendly knowledge base. It effortlessly ingests files (PDFs, DOCXs, spreadsheets), websites, and GitHub repositories, then leverages LLMs to generate a Markdown knowledge base. Ideal for creating structured and crawlable formats like llms.txt.",
    tags: ["GenAI", "RAG"],
    category: ["genai", "rag"],
    links: [
      { type: "pypi", url: "https://pypi.org/project/knowledge-base-builder/" },
      { type: "github", url: "https://github.com/kostadindev/knowledge-base-builder" }
    ],
    image: "./images/kbb.png"
  },
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

export const experience = [
  {
    title: "Software Engineer",
    company: "Stellar Cyber",
    location: "San Jose, CA",
    period: "May 2022 – September 2025",
    logo: "data:image/png;base64,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",
    highlights: [
      "Built a human-augmented, multi-agent autonomous security operations system that triages incoming cases by analyzing related alerts with LLMs and generating concise, user-friendly summaries. Showcased as Stellar's main highlight at RSA 2025 and Black Hat 2025.",
      "Developed the chat interface, session management, and visualization suite for the Open XDR Investigator, a GenAI-powered cybersecurity copilot enabling data summarization and multi-chart visualizations driven by natural language prompts. Featured at RSA 2024 and Black Hat 2024.",
      "Implemented bidirectional WebSocket communication, reducing average response times by 70% through parallel data and LLM requests.",
      "Prepared knowledge-enriched GPTs capable of visualizations, API calls, and script execution for log analysis, product metrics, and data source classification.",
      "Maintained over 90% test coverage, reducing bug filings on owned components by 34% year-over-year."
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "Vivansa",
    location: "Sofia, Bulgaria",
    period: "June 2019 – August 2019",
    logo: "https://i0.wp.com/vivansa.com/wp-content/uploads/Vivansa_4_logo_full_transparent_801x229.png?fit=801%2C229&ssl=1",
    highlights: [
      "Enhanced the front end of a CRM application to improve UI components and user experience.",
      "Identified and resolved erroneous database entries, implemented data cleaning procedures, and analyzed root causes to prevent future inconsistencies."
    ]
  },
  {
    title: "Creative Electronic Media Assistant",
    company: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "March 2020 – May 2020",
    logo: "https://studyhawaii.org/wp-content/uploads/2017/11/Hilo.jpg",
    highlights: [
      "Developed an API to control a hologram display, enabling integration with external applications.",
      "Created the website for Data Viz, a data visualization lab, showcasing media projects through videos and photos.",
      "Installed and configured operating systems and software, and maintained computers and 3D printers in labs."
    ]
  }
];

export const teaching = [
  {
    title: "AI Leadership Mentor",
    institution: "UniHawk",
    location: "Kuwait City, Kuwait",
    period: "December 2025",
    description: "Mentored high school students through hands-on projects in a week-long bootcamp to build AI apps, promoting creativity, technical fluency, and confidence with AI tools."
  },
  {
    title: "Teaching Assistant",
    institution: "Stony Brook University",
    location: "Stony Brook, NY",
    period: "August 2020 – May 2021",
    description: "Supported teaching AMS 210: Applied Linear Algebra for two semesters. Held weekly office hours to assist students with coursework and graded assignments."
  },
  {
    title: "Linear Algebra Grader",
    institution: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "March 2020 – May 2020",
    description: "Graded exams and assignments for MATH 311: Linear Algebra. Provided homework assistance to students."
  },
  {
    title: "Computer Science Grader",
    institution: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "October 2019 – December 2019",
    description: "Evaluated programming assignments for CS 150: Introduction to Computer Science. Assisted students with fundamental programming principles."
  }
];

export const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
];
