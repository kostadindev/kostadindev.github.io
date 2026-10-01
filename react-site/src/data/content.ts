export const personalInfo = {
  name: "Kostadin Devedzhiev",
  email: "kostadin.g.devedzhiev@gmail.com",
  tagline: "PhD Student, Human-AI Interaction | TRACE Lab, Cambridge",
  cvUrl: "./documents/cv.pdf",
  avatar: "./images/headshot.jpg",
  bio: [
    `I'm a PhD student at the Centre for Human-Inspired AI (CHIA), University of Cambridge, where I am part of the TRACE Lab, co-supervised by Professor Umang Bhatt and Professor Adrian Weller. My research is on human–AI interaction: systems where people and AI agents work together when their skills, costs and availability differ. I am also a research assistant on Hybrid Workforces, a collaboration between CHIA and Accenture Singapore, and I am building Tailor, a platform for designing workflows with built-in human oversight and governance controls for regulated industries.`,
    `Before that, I was a software engineer at Stellar Cyber in San Jose, California, working on AI tools for security analysts.`,
    `In my free time, I enjoy being outdoors in nature, going to music festivals, and playing racquet sports.`
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kostadin-dev/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/KostadinDev", icon: "github" },
    { name: "Google Scholar", url: "https://scholar.google.com/citations?user=hJlCT-0AAAAJ&hl=en", icon: "scholar" },
    { name: "ORCID", url: "https://orcid.org/0009-0008-2508-2766", icon: "orcid" },
    { name: "LeetCode", url: "https://leetcode.com/u/user9852My/", icon: "code" },
  ]
};

export const currentWork = [
  {
    title: "Ad Hoc Human–AI Orchestration via Skill Inference",
    description: "My MPhil thesis at Cambridge (Distinction). It estimates what people and AI models are good at from a few observations. Each person's ability is modelled as a Bayesian belief over a taxonomy of skills. Because skills are correlated, one observation also updates related skills, so profiles become accurate with fewer observations than scoring each skill separately. The method is released as [skillinfer](https://kostadindev.github.io/skillinfer) and used in [Tailor](https://tailorworkflow.com).",
    tags: ["Human-AI Orchestration", "Bayesian Inference", "Agentic AI"],
    links: [
      { type: "thesis", url: "./documents/thesis/thesis.pdf" },
      { type: "poster", url: "./documents/thesis/poster.pdf" },
      { type: "presentation", url: "./documents/thesis/presentation.pdf" },
      { type: "docs", url: "https://kostadindev.github.io/skillinfer" },
      { type: "github", url: "https://github.com/kostadindev/skillinfer" },
      { type: "pypi", url: "https://pypi.org/project/skillinfer/" }
    ],
    image: "./documents/thesis/thesis-cover.svg",
    visuals: [
      { kind: "image", src: "./documents/thesis/thesis-cover.svg", caption: "Skill inference: the estimate moves toward the true profile as observations arrive" },
      { kind: "component", name: "skill-pipeline", caption: "The skillinfer pipeline: prior, observe a task, update related skills, posterior, assign the task" },
      { kind: "component", name: "skill-covariance", caption: "Skill covariance: observing Mathematics also updates related skills" }
    ]
  },
  {
    title: "Tailor",
    description: "A platform for building workflows that combine AI agents with human review. It has a visual workflow builder and four levels of human control, from fully automated to human-led. It is aimed at regulated fields such as healthcare, finance and law.",
    tags: ["Human-AI Orchestration", "Agentic AI", "Human-in-the-Loop"],
    links: [
      { type: "website", url: "https://tailorworkflow.com" }
    ],
    image: "./images/tailor-cover.png"
  }
  // Hidden for now — restore to show again:
  // {
  //   title: "MARL-Align",
  //   description: "A multi-agent reinforcement learning framework for LLM value alignment. Formalizes alignment as a decentralized POMDP and uses social welfare functions to train group-personalized language models. Evaluated on politically polarizing conversations, balancing individual user preferences with collective societal welfare through fairness-aware optimization.",
  //   tags: ["MARL", "LLM Alignment", "Social Choice Theory"],
  //   links: [],
  //   image: "./images/marl-align-cover.jpg"
  // }
];

export interface Project {
  /** Canonical full title. Text before the first colon is used as the display name. */
  title: string;
  /** Overrides the derived display name when the pre-colon title is still too long. */
  shortTitle?: string;
  /** One scannable line for the archive index. Keep under ~70 characters. */
  tagline: string;
  description: string;
  tags: string[];
  category: string[];
  links: { type: string; url: string }[];
  image: string;
  imageFit?: string;
}

export const projects: Project[] = [
  {
    title: "Humans as Sensors: Cost-Aware Routing for Structured Human–AI Information Gathering",
    tagline: "Cost-aware routing for structured human–AI information gathering",
    description: "An AI asks specific people for information when it is unsure. On MedQA, asking through a structured Human API reaches the same accuracy as open conversation (84–87%), costs less, and solves different cases. A bandit version learns whom to ask over time.",
    tags: ["Human-AI Collaboration", "Agentic AI", "Medical AI"],
    category: ["genai", "agentic", "human-ai"],
    links: [
      { type: "report", url: "./documents/papers/human-ai-collab/human_ai_collab_26.html" },
      { type: "paper", url: "./documents/papers/human-ai-collab/paper.pdf" }
    ],
    image: "./documents/papers/human-ai-collab/hapi-animated-svg.svg"
  },
  {
    title: "Knowledge Base Builder: Multi-Source Knowledge Base Construction with LLMs",
    tagline: "Multi-source knowledge base construction with LLMs",
    description: "A Python package that uses an LLM to turn papers, repositories, documents, recordings and slides into Markdown knowledge bases. It reads 11 source types, and the output can be used for RAG, vector databases or an llms.txt file.",
    tags: ["GenAI", "RAG"],
    category: ["genai", "nlp"],
    links: [
      { type: "report", url: "./documents/papers/kbb/kbb_26.html" },
      { type: "pypi", url: "https://pypi.org/project/knowledge-base-builder/" },
      { type: "github", url: "https://github.com/kostadindev/knowledge-base-builder" }
    ],
    image: "./images/kbb.svg"
  },
  {
    title: "Fairness and Transparency Analysis of Hospital Readmission Prediction",
    shortTitle: "Hospital Readmission Fairness Audit",
    tagline: "Demographic parity, equalized odds, and SHAP/LIME across 130 hospitals",
    description: "Audits a 30-day hospital readmission model on the Diabetes 130-Hospitals dataset. Measures demographic parity and equalized odds with Fairlearn, explains predictions with SHAP and LIME, and reduces group disparities by 74% with Exponentiated Gradient.",
    tags: ["Responsible AI", "Fairness", "Transparency"],
    category: ["human-ai"],
    links: [
      { type: "report", url: "./documents/papers/responsible_ai/responsible_ai_25.html" },
      { type: "paper", url: "./documents/papers/responsible_ai/responsible_ai_25.pdf" }
    ],
    image: "./images/responsible-ai-cover.svg"
  },
  {
    title: "MobileAgents: Mobile Multimodal Interface for Controlling Teams of AI Agents On the Go",
    tagline: "Mobile multimodal interface for controlling teams of AI agents",
    description: "An open-source mobile app for directing a team of AI agents by text, voice or image. An LLM orchestrator splits each request into tasks and assigns them to agents. The app offers three levels of transparency, from black box to a live execution graph. In a study (N=13), trust and sense of control increased with each level.",
    tags: ["Agentic AI", "HCI", "Multimodal"],
    category: ["agentic", "human-ai"],
    links: [
      { type: "report", url: "./documents/papers/mobile_agents/mobile_agents_26.html" },
      { type: "paper", url: "./documents/papers/mobile_agents/Mobile_Agent_Manager.pdf" }
    ],
    image: "./documents/papers/mobile_agents/flow.png",
    imageFit: "contain"
  },
  {
    title: "Threat Explorer: Agentic Architectures and Visualization for Cybersecurity Analytics",
    tagline: "Agentic architectures and visualization for cybersecurity analytics",
    description: "A chat tool that turns plain-language questions into SQL over a 40,000-record attack dataset. It compares three agent designs (LLM chain, ReAct and multi-agent) on accuracy, latency and cost. In a study (N=12), answers with charts scored higher than text-only answers on usability, clarity and speed.",
    tags: ["Cybersecurity", "Agentic AI", "RAG"],
    category: ["genai", "agentic", "human-ai"],
    links: [
      { type: "report", url: "./documents/papers/threat_explorer/threat_explorer_26.html" },
      { type: "paper", url: "./documents/papers/threat_explorer/threat_explorer_26.pdf" },
      { type: "github", url: "https://github.com/kostadindev/threat-explorer" }
    ],
    image: "./images/threat-explorer-svg.svg"
  },
  {
    title: "GONEXT.lol",
    tagline: "Multi-agent League of Legends analytics with a visible thinking trail",
    description: "A League of Legends analytics platform built on a multi-agent LLM system. It shows its reasoning step by step, computes statistics from match history, and suggests strategies and item builds from the live game state. Users can also ask questions about patches, players and tournaments.",
    tags: ["GenAI", "Agentic AI", "RAG"],
    category: ["genai", "agentic"],
    links: [
      { type: "website", url: "https://gonext.lol" },
      { type: "github", url: "https://github.com/KostadinDev/gonext" }
    ],
    image: "./images/gonext-cover-chat.webp"
  },
  {
    title: "Symbiotic Learning",
    tagline: "Human-in-the-loop annotation of invasive species in drone imagery",
    description: "A human-in-the-loop tool for labelling invasive species in drone images, built to support conservation work in Hawaii.",
    tags: ["Computer Vision", "Human-in-the-Loop", "Ecological Conservation"],
    category: ["cv", "human-ai"],
    links: [{ type: "article", url: "https://hilo.hawaii.edu/chancellor/stories/2020/08/11/students-research-into-artificial-intelligence/" }],
    image: "./images/symbiotic-learning.jpg"
  },
  {
    title: "I Want to Redistrict",
    tagline: "Statistical districting analysis for detecting gerrymandering",
    description: "An application that creates and evaluates state districting plans from 2020 Census data, to detect gerrymandering and produce fairer district maps.",
    tags: ["High Performance Computing", "Human-in-the-Loop", "Political Science"],
    category: ["hpc", "human-ai"],
    links: [],
    image: "./images/redistrict.png"
  },
  {
    title: "Deep Gestures",
    tagline: "Gesture recognition on an Arduino Nano 33 BLE Sense",
    description: "A gesture recognition pipeline for the Arduino Nano 33 BLE Sense, using its built-in accelerometer, gyroscope and magnetometer.",
    tags: ["Computer Vision", "IoT"],
    category: ["cv", "iot"],
    links: [{ type: "github", url: "https://github.com/KostadinDev/deep-gestures" }],
    image: "./images/deep-gestures-image.jpg"
  },
  {
    title: "Recursive QA",
    tagline: "NLP annotation as question answering over constituency parse trees",
    description: "An NLP annotation framework that replaces labelling with guided questions. It generates question–answer pairs from constituency parse trees to walk annotators through each sentence.",
    tags: ["NLP", "Human-in-the-Loop"],
    category: ["nlp", "human-ai"],
    links: [{ type: "github", url: "https://github.com/KostadinDev/Recursive-QA" }],
    image: "./images/recursiveqa-cover.jpg"
  },
  {
    title: "League of Legends MCP Server",
    tagline: "35+ MCP tools exposing Riot Games API data to LLMs",
    description: "An open-source MCP server that gives LLMs access to League of Legends data through the Riot Games API, with over 35 tools for player statistics, match history, champions, tournaments and live games.",
    tags: ["MCP", "Agentic AI", "GenAI"],
    category: ["mcp", "agentic"],
    links: [
      { type: "github", url: "https://github.com/kostadindev/League-of-Legends-MCP" },
      { type: "docker", url: "https://hub.docker.com/r/kostadindev/league-mcp" },
      { type: "pypi", url: "https://pypi.org/project/league-mcp/" }
    ],
    image: "./images/league-mcp-cover.gif"
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
    degree: "Doctor of Philosophy in Human-Inspired AI",
    details: ["TRACE Lab · Queens' College", "Co-supervised by Umang Bhatt and Adrian Weller", "October 2026 – Present"],
    link: "https://www.chia.cam.ac.uk/",
    logo: "./images/cambridge-logo.png"
  },
  {
    institution: "University of Cambridge",
    degree: "Master of Philosophy in Human-Inspired AI",
    details: ["TRACE Lab · Homerton College", "Cambridge AI Research Society", "Awarded with Distinction (82.6/100)"],
    link: "https://www.chia.cam.ac.uk/",
    transcript: "./documents/cambridge_transcript.pdf",
    logo: "./images/cambridge-logo.png"
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
    logo: "./images/stony-brook-logo.png"
  },
  {
    institution: "University of Hawaii at Hilo",
    degree: "National Student Exchange Program",
    details: ["Computer Science Major | GPA: 3.97/4.00"],
    transcript: "./documents/uhh_transcript.pdf",
    logo: "./images/hawaii-hilo-logo.png"
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
    image: "./images/cert-ibm-genai.png",
    link: "https://www.credly.com/users/kostadin-devedzhiev.e059b079"
  },
  {
    title: "MCP: Build Rich-Context AI Apps with Anthropic",
    image: "./images/cert-deeplearning-ai.png",
    link: "https://learn.deeplearning.ai/accomplishments/b1ee6756-bc7a-45e1-83e8-ff376ae07c8c"
  },
  {
    title: "AI Agents in LangGraph",
    image: "./images/cert-deeplearning-ai.png",
    link: "https://learn.deeplearning.ai/accomplishments/896e518d-07f3-4161-80b8-cb7d58ccc1c3"
  }
];

export const experience = [
  {
    title: "Research Assistant",
    company: "University of Cambridge (CHIA)",
    location: "Cambridge, UK",
    period: "July 2026 – Present",
    logo: "./images/cambridge-logo.png",
    highlights: [
      "Research on Hybrid Workforces, a collaboration between CHIA and Accenture Singapore.",
      "Writing the first paper: how to split work between people and AI agents, using skill inference, a Human API for agents to ask people for input or sign-off, and dynamic controls for how much work stays with people."
    ]
  },
  {
    title: "Software Engineer",
    company: "Stellar Cyber",
    location: "San Jose, CA",
    period: "May 2022 – September 2025",
    logo: "./images/stellar-cyber-logo.png",
    highlights: [
      "Designed a multi-agent system that triages security cases, correlating alerts with LLMs and writing summaries for analysts. Shown as the main demo at RSA 2025 and Black Hat 2025.",
      "Built the chat interface, session management and charts for Open XDR Investigator, an AI assistant that turns questions into Elasticsearch queries (RSA 2024, Black Hat 2024).",
      "Added two-way WebSocket communication and parallel data and LLM requests, cutting average response time by 70%.",
      "Built GPT-based agents for log analysis, product metrics, connector normalisation and data-source classification.",
      "Kept test coverage above 90% on my components and reduced bug reports by 34% year over year."
    ]
  },
  {
    title: "NLP Research Assistant",
    company: "Stony Brook University",
    location: "Stony Brook, NY",
    period: "August 2021 – May 2022",
    logo: "./images/stony-brook-logo.png",
    highlights: [
      "Designed Recursive QA, a framework that turns formal annotation into guided question answering.",
      "Generated question–answer pairs from parse trees and removed duplicates with clustering on Levenshtein distance.",
      "Built a full-stack app for the framework with accounts, work history and graphs.",
      "Reached over 80% inter-annotator agreement, with experienced users finishing an annotation in about 30 seconds."
    ]
  },
  {
    title: "Artificial Intelligence Research Assistant",
    company: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "June 2020 – August 2020",
    logo: "./images/hawaii-hilo-logo.png",
    highlights: [
      "Tuned a CNN to detect invasive species in drone footage.",
      "Built an annotation tool that gives more AI help as the model improves."
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "Vivansa",
    location: "Sofia, Bulgaria",
    period: "June 2019 – August 2019",
    logo: "./images/vivansa-logo.png",
    highlights: [
      "Improved the front-end components of a CRM.",
      "Found and fixed incorrect database entries and added automated data cleaning."
    ]
  },
  {
    title: "Creative Electronic Media Assistant",
    company: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "March 2020 – May 2020",
    logo: "./images/hawaii-hilo-logo.png",
    highlights: [
      "Built an API for a hologram display.",
      "Built the Data Visualization Lab website.",
      "Maintained the lab's computers and 3D printers."
    ]
  }
];

export const teaching = [
  {
    title: "AI Innovation & Leadership Mentor",
    institution: "UniHawk",
    location: "Kuwait City, Kuwait",
    period: "December 2025",
    description: "Mentored high-school students through a week-long AI app-building bootcamp.",
    link: "https://alearninglab.com/conferences/ai-innovation-leadership-bootcamp-kuwait/"
  },
  {
    title: "Teaching Assistant",
    institution: "Stony Brook University",
    location: "Stony Brook, NY",
    period: "August 2020 – May 2021",
    description: "Teaching assistant for Applied Linear Algebra for two semesters: weekly office hours and grading."
  },
  {
    title: "Linear Algebra Grader",
    institution: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "March 2020 – May 2020",
    description: "Graded exams and homework for MATH 311: Linear Algebra."
  },
  {
    title: "Computer Science Grader",
    institution: "University of Hawaii at Hilo",
    location: "Hilo, HI",
    period: "October 2019 – December 2019",
    description: "Graded assignments for CS 150: Introduction to Computer Science."
  }
];

export const news = [
  {
    date: "Oct 2026",
    location: "Cambridge, UK",
    title: "Started my PhD at Cambridge",
    description: "Began my PhD in Human-Inspired AI at CHIA and Queens' College, in the TRACE Lab, co-supervised by Umang Bhatt and Adrian Weller.",
    link: "https://trace-lab.ai/",
  },
  {
    date: "Jul 2026",
    location: "Cambridge, UK",
    title: "Research Assistant on Hybrid Workforces",
    description: "Joined CHIA as a research assistant on Hybrid Workforces, a collaboration with Accenture Singapore on how people and AI agents should share work.",
    link: "https://www.chia.cam.ac.uk/",
  },
  {
    date: "Jul 2026",
    location: "Oxford, UK",
    title: "Oxford Human–Algorithm Interaction (HAI) Workshop 2026",
    description: "Gave a talk on my thesis, *Ad Hoc Human–AI Orchestration via Skill Inference*, at the Oxford HAI Workshop (6–8 July, Saïd Business School). [Slides](documents/thesis/presentation.pdf)",
    link: "https://www.sbs.ox.ac.uk/events/human-algorithm-interaction-workshop-2026",
  },
  {
    date: "Jun 2026",
    location: "Cambridge, UK",
    title: "CHIA Annual Conference 2026 — AI for Good",
    description: "Presented my thesis poster, *Ad Hoc Human–AI Orchestration via Skill Inference*, at CHIA's annual conference in the Cambridge Union. [Poster](documents/thesis/poster.pdf)",
    link: "https://www.chia.cam.ac.uk/",
  },
  {
    date: "Mar 2026",
    location: "London, UK",
    title: "ICO Technical Workshop: Know Your Data",
    description: "Attended the UK Information Commissioner's Office workshop on AI transparency and personal data in foundation model training. [Report](documents/misc/pii-expansion.html) [Slide](documents/misc/kostadin-ico-slide.pdf)",
    link: "https://ico.org.uk/global/know-your-data/#ICO",
  },
  {
    date: "Feb 2026",
    location: "New Delhi, India",
    title: "IndiaAI Research Symposium",
    description: "Presented [Tailor](https://tailorworkflow.com) for the TRACE Lab at the IndiaAI Impact Summit.",
    link: "https://impact.indiaai.gov.in/events/research-symposium",
  },
  {
    date: "Dec 2025",
    location: "Kuwait City, Kuwait",
    title: "AI Innovation & Leadership Bootcamp",
    description: "Mentored high-school students at an AI app-building bootcamp run by A Learning Lab.",
    link: "https://alearninglab.com/conferences/ai-innovation-leadership-bootcamp-kuwait/",
  },
  {
    date: "Aug 2025",
    location: "Las Vegas, NV",
    title: "AI Investigator Featured at Black Hat 2025",
    description: "My work on the AI Investigator for Stellar Cyber was featured at Black Hat 2025.",
    link: "https://stellarcyber.ai/stellar-cyber-improves-soc-operations-with-human-augmented-autonomous-cybersecurity-blackhat-2025/",
  },
  {
    date: "Apr 2025",
    location: "San Francisco, CA",
    title: "AutoSOC Featured at RSA Conference 2025",
    description: "My work on the AutoSOC agent for Stellar Cyber was featured at RSAC 2025.",
    link: "https://stellarcyber.ai/news/press-releases/stellar-cyber-debuts-the-human-augmented-autonomous-soc-powered-by-agentic-ai-at-rsac-2025/",
  },
];

export const travelCountries = {
  europe: [
    { id: "100", name: "Bulgaria" },
    { id: "300", name: "Greece" },
    { id: "792", name: "Turkey" },
    { id: "056", name: "Belgium" },
    { id: "250", name: "France" },
    { id: "528", name: "Netherlands" },
    { id: "380", name: "Italy" },
    { id: "040", name: "Austria" },
    { id: "688", name: "Serbia" },
    { id: "705", name: "Slovenia" },
    { id: "191", name: "Croatia" },
    { id: "826", name: "United Kingdom" },
    { id: "724", name: "Spain" },
    { id: "470", name: "Malta" },
  ],
  northAmerica: [
    { id: "840", name: "United States" },
    { id: "124", name: "Canada" },
    { id: "484", name: "Mexico" },
  ],
  caribbean: [
    { id: "044", name: "Bahamas" },
    { id: "630", name: "Puerto Rico" },
  ],
  middleEast: [
    { id: "414", name: "Kuwait" },
  ],
  asia: [
    { id: "704", name: "Vietnam" },
    { id: "702", name: "Singapore" },
    { id: "458", name: "Malaysia" },
    { id: "410", name: "South Korea" },
    { id: "392", name: "Japan" },
    { id: "156", name: "China" },
  ],
  southAmerica: [
    { id: "604", name: "Peru" },
    { id: "076", name: "Brazil" },
    { id: "170", name: "Colombia" },
  ],
};

export const navItems = [
  { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Work", href: "#work" },
  { name: "Publications", href: "#publications" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];
