/**
 * Single source of truth for all portfolio content.
 * Every value below comes from the résumé "ALLAN RAYMOND S – B.Tech Data Scientist".
 * Anything the résumé does not contain is `null` / absent so the UI can omit it.
 */

/* ───────────────────────── Types ───────────────────────── */

export interface Profile {
  name: string;
  /** Initials shown in the round nav mark (derived from the name). */
  initials: string;
  /** First name, used for the hero ghost word. */
  firstName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  /** Résumé "Professional Summary", verbatim. */
  resumeSummary: string;
  /** One extra short line for About, built only from résumé facts. */
  aboutExtra: string;
  languages: string[];
  /** Not present in the résumé → null → button/link omitted. */
  github: string | null;
  /** From the résumé hyperlink; the résumé stores it without a scheme, https:// added so it works. */
  linkedin: string | null;
  /** File copied into /public for the Résumé button. */
  resumePath: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export type ProjectId = "mock-interview" | "airline" | "incident-intelligence";

export type SkillGroupId =
  | "languages-libraries"
  | "data-science-ml"
  | "analysis-visualization"
  | "database-sql"
  | "statistics"
  | "generative-ai"
  | "developer-tools";

export interface Skill {
  name: string;
  /** Résumé parenthetical detail, e.g. SQL (DDL, DML, Joins…). */
  detail?: string;
  /** Projects where the résumé text explicitly mentions this skill. */
  projects: ProjectId[];
  /** Devicon slug, only where one is known to exist. Verified when logos are installed. */
  logo?: string;
}

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  skills: Skill[];
}

export interface TechChip {
  name: string;
  logo?: string;
}

export interface Project {
  id: ProjectId;
  number: string;
  title: string;
  kicker: string;
  /** Where the résumé lists it. */
  source: "projects" | "experience";
  /** First résumé bullet, verbatim. */
  description: string;
  /** Remaining résumé bullets, verbatim. */
  features: string[];
  tech: TechChip[];
  /** Only set when a verified URL exists. None in the résumé. */
  url: string | null;
  /** Dashboard image in /public. */
  image: string;
  imageAlt: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string; // YYYY-MM, for chronological ordering
  end: string | null; // null = present
  projectTitle: string;
  projectId: ProjectId;
  bullets: string[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  level: string;
  institution: string;
  location: string | null;
  period: string;
  start: number;
  end: number;
  score: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
}

/* ───────────────────────── Profile ───────────────────────── */

export const PROFILE: Profile = {
  name: "Allan Raymond S",
  initials: "AR",
  firstName: "Allan",
  role: "Data Scientist",
  email: "allanraymond2005@gmail.com",
  phone: "9042523546",
  phoneHref: "tel:9042523546",
  location: "Chennai",
  resumeSummary:
    "Results-oriented Data Scientist with six months of experience and a strong foundation in Python, SQL, Excel, statistics, and data analysis. Skilled in data cleaning, data preprocessing, exploratory data analysis (EDA), data visualization, KPI reporting, and dashboard development. Familiar with Pandas, NumPy, Matplotlib, Seaborn, and Scikit-learn, with an interest in Machine Learning, predictive analytics, and Generative AI. Passionate about solving real-world business problems through data-driven insights and continuously developing technical skills to build a career in Data Science",
  aboutExtra:
    "Based in Chennai, with knowledge of Tamil, English, Hindi, and German.",
  languages: ["Tamil", "English", "Hindi", "German"],
  github: null,
  linkedin: "https://www.linkedin.com/in/allanraymond26",
  resumePath: "/Allan_Raymond_S_Resume.pdf",
};

/* ───────────────────────── Navigation ───────────────────────── */

export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ───────────────────────── Skills (7 résumé categories) ───────────────────────── */

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages-libraries",
    label: "Languages & Libraries",
    skills: [
      { name: "Python", projects: ["incident-intelligence"], logo: "python" },
      { name: "Pandas", projects: ["incident-intelligence"], logo: "pandas" },
      { name: "NumPy", projects: [], logo: "numpy" },
      { name: "Matplotlib", projects: [], logo: "matplotlib" },
      { name: "Seaborn", projects: [] },
      { name: "Scikit-learn", projects: ["incident-intelligence"], logo: "scikitlearn" },
      { name: "Django", projects: [], logo: "django" },
    ],
  },
  {
    id: "data-science-ml",
    label: "Data Science & Machine Learning",
    skills: [
      { name: "Data Preprocessing", projects: [] },
      { name: "Feature Engineering", projects: [] },
      { name: "Exploratory Data Analysis (EDA)", projects: [] },
      { name: "Supervised Learning", projects: [] },
      { name: "Unsupervised Learning", projects: [] },
      { name: "Regression", projects: [] },
      { name: "Classification", projects: [] },
      { name: "Clustering", projects: [] },
      { name: "Model Evaluation", projects: ["incident-intelligence"] },
    ],
  },
  {
    id: "analysis-visualization",
    label: "Data Analysis & Visualization",
    skills: [
      { name: "Microsoft Excel", projects: [] },
      { name: "Power BI", projects: ["airline"] },
      { name: "Data Cleaning", projects: ["incident-intelligence"] },
      { name: "Data Visualization", projects: ["incident-intelligence", "airline"] },
      { name: "Statistical Analysis", projects: [] },
      { name: "Data Interpretation", projects: [] },
      { name: "Dashboard Development", projects: ["incident-intelligence", "airline"] },
    ],
  },
  {
    id: "database-sql",
    label: "Database & SQL",
    skills: [
      { name: "MySQL", projects: ["airline"], logo: "mysql" },
      {
        name: "SQL",
        detail: "DDL, DML, Joins, Subqueries, Aggregations, CTEs",
        projects: ["incident-intelligence", "airline"],
      },
      { name: "Database Design", projects: ["airline"] },
      { name: "Query Optimization", projects: ["airline"] },
    ],
  },
  {
    id: "statistics",
    label: "Statistics",
    skills: [
      { name: "Descriptive Statistics", projects: [] },
      { name: "Probability", projects: [] },
      { name: "Hypothesis Testing", projects: [] },
      { name: "Correlation & Regression Analysis", projects: [] },
    ],
  },
  {
    id: "generative-ai",
    label: "Generative AI",
    skills: [
      { name: "Generative AI Fundamentals", projects: ["mock-interview"] },
      { name: "Prompt Engineering", projects: [] },
      { name: "LLM Concepts", projects: [] },
      { name: "AI-Assisted Data Analysis", projects: [] },
    ],
  },
  {
    id: "developer-tools",
    label: "Developer Tools",
    skills: [
      { name: "Git", projects: ["incident-intelligence"], logo: "git" },
      { name: "GitHub", projects: [], logo: "github" },
      { name: "VS Code", projects: [], logo: "vscode" },
      { name: "Jupyter Notebook", projects: [], logo: "jupyter" },
    ],
  },
];

/* ───────────────────────── Projects (Work panels) ───────────────────────── */

export const PROJECTS: Project[] = [
  {
    id: "mock-interview",
    image: "/Mock_Interview.jpg",
    imageAlt: "Dashboard image of the AI-Based Mock Interview Platform project",
    number: "01",
    title:
      "AI-Based Mock Interview Platform with Multi-Modal Analysis and Candidate Readiness Index",
    kicker: "NLP · Generative AI · Speech · Computer Vision",
    source: "projects",
    description:
      "Engineered a multi-modal AI interview simulation platform integrating NLP, generative AI, speech recognition, and computer vision to automate candidate evaluation with React, Flask, and PostgreSQL.",
    features: [
      "Implemented resume parsing and context-aware question generation using PyMuPDF, spaCy, and Mistral-7B, extracting structured candidate entities to drive personalized, domain-specific interview questions.",
      "Built speech and behavioral analysis pipelines with VOSK, SentenceBERT, OpenCV, and DeepFace, achieving 84–88% accuracy across entity extraction, transcription, and emotion detection modules.",
      "Designed a composite Candidate Readiness Index combining linguistic, behavioral, emotional, and content-accuracy scores, validated through pilot testing on 26 participants for consistent, interpretable feedback.",
    ],
    tech: [
      { name: "React", logo: "react" },
      { name: "Flask", logo: "flask" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "PyMuPDF" },
      { name: "spaCy" },
      { name: "Mistral-7B" },
      { name: "VOSK" },
      { name: "SentenceBERT" },
      { name: "OpenCV", logo: "opencv" },
      { name: "DeepFace" },
    ],
    url: null,
  },
  {
    id: "airline",
    image: "/Airline.jpg",
    imageAlt: "Dashboard image of the Airline Reservation and Flight Management System project",
    number: "02",
    title: "Airline Reservation & Flight Management System",
    kicker: "MySQL · Database Design · Analytics",
    source: "projects",
    description:
      "Designed a normalized (3NF) MySQL airline database with 10+ interconnected tables, using indexing, triggers, and transaction-safe booking procedures to maintain data integrity and optimize query performance.",
    features: [
      "Built window-function and CTE-based analytics for route profitability, load factor, and customer segmentation, visualized in a Power BI dashboard.",
    ],
    tech: [{ name: "MySQL", logo: "mysql" }, { name: "Power BI" }],
    url: null,
  },
  {
    id: "incident-intelligence",
    image: "/A_Incident.jpg",
    imageAlt: "Dashboard image of the AI-Powered IT Incident Intelligence Platform project",
    number: "03",
    title: "AI-Powered IT Incident Intelligence Platform",
    kicker: "BDreamz Global Solutions Pvt Ltd · Data Scientist",
    source: "experience",
    description:
      "Developed a Python-based incident analytics pipeline using Pandas and SQL to clean, process, and analyse IT incident data.",
    features: [
      "Built and evaluated machine learning models to predict incident resolution time and identify potential SLA risks.",
      "Implemented a FastAPI backend to serve model predictions and process incident-related requests.",
      "Designed an interactive Streamlit dashboard to visualise incident trends, prioritisation insights, and prediction results.",
      "Applied model evaluation, explainability techniques, and automated testing to assess prediction reliability and improve maintainability.",
    ],
    tech: [
      { name: "Python", logo: "python" },
      { name: "Pandas", logo: "pandas" },
      { name: "Scikit-learn", logo: "scikitlearn" },
      { name: "SQL" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "Streamlit" },
      { name: "Git", logo: "git" },
      { name: "Docker", logo: "docker" },
    ],
    url: null,
  },
];

/* ───────────────────────── Experience ───────────────────────── */

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "bdreamz",
    company: "BDreamz Global Solutions Pvt Ltd",
    role: "Data Scientist",
    period: "May 2026 – Present",
    start: "2026-05",
    end: null,
    projectTitle: "AI-Powered IT Incident Intelligence Platform",
    projectId: "incident-intelligence",
    bullets: [
      "Developed a Python-based incident analytics pipeline using Pandas and SQL to clean, process, and analyse IT incident data.",
      "Built and evaluated machine learning models to predict incident resolution time and identify potential SLA risks.",
      "Implemented a FastAPI backend to serve model predictions and process incident-related requests.",
      "Designed an interactive Streamlit dashboard to visualise incident trends, prioritisation insights, and prediction results.",
      "Applied model evaluation, explainability techniques, and automated testing to assess prediction reliability and improve maintainability.",
    ],
    techStack: ["Python", "Pandas", "Scikit-learn", "SQL", "FastAPI", "Streamlit", "Git", "Docker"],
  },
];

/* ───────────────────────── Education ───────────────────────── */

export const EDUCATION: EducationItem[] = [
  {
    id: "sslc",
    level: "SSLC (Class X)",
    institution: "SBK Thyagarajan Memorial Matriculation School",
    location: "Aruppukottai",
    period: "2019 – 2020",
    start: 2019,
    end: 2020,
    score: "74%",
  },
  {
    id: "hsc",
    level: "HSC (Class XII)",
    institution: "Sri Sowdambika Convent",
    location: "Aruppukottai",
    period: "2021 – 2022",
    start: 2021,
    end: 2022,
    score: "70%",
  },
  {
    id: "btech",
    level: "B.Tech — CSE / Data Science",
    institution: "Kalasalingam Academy of Research and Education",
    location: null,
    period: "2022 – 2026",
    start: 2022,
    end: 2026,
    score: "7.0 CGPA",
  },
];

/* ───────────────────────── Certifications ───────────────────────── */

export const CERTIFICATIONS: Certification[] = [
  { id: "data-analyst", title: "Data Analyst Certification", issuer: "Besant Technologies" },
  { id: "anthropic-courses", title: "Anthropic Courses Certification", issuer: "Anthropic" },
];