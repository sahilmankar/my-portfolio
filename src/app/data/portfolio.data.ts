import {
  EducationItem,
  ExperienceItem,
  MetricItem,
  ProfileInfo,
  ProjectItem,
  SkillCategory,
} from '../models/portfolio.model';

export const PROFILE_INFO: ProfileInfo = {
  name: 'Sahil Mankar',
  role: 'Full Stack .NET / Angular Developer',
  headline: 'Building enterprise-grade .NET Core & Angular applications with SQL Server optimization.',
  experienceYears: '2.8+',
  location: 'Pune, Maharashtra, India',
  email: 'sahilmankar311@gmail.com',
  phone: '+918530728589',
  phoneDisplay: '+91 8530728589',
  linkedinUrl: 'https://www.linkedin.com/in/sahil-mankar-a64670232/',
  linkedinLabel: 'linkedin.com/in/sahil-mankar-a64670232',
  githubUrl: 'https://github.com/sahilmankar',
  avatarUrl:
    'https://avatars.githubusercontent.com/u/110836726?s=400&u=05a1298a671ccf8396d53879db23de326e33ee46&v=4',
  resumeUrl: 'Sahil_Mankar_Resume.pdf',
  resumeFileName: 'Sahil_Mankar_Resume.pdf',
  availabilityText: 'Software Engineer · Emsphere Technologies',
  summary:
    'Software Engineer with 2.8+ years of experience  building enterprise-grade web applications, specializing in .NET Core, ASP.NET MVC, C#, Angular, and SQL Server. Experienced in developing HR, payroll, attendance, and workforce management systems, including biometric device integrations with Smartface, Alpeta, and ZKTeco, plus multi-tenant SaaS platforms like DairyOps deployed on AWS EC2.',
  engineeringFocus: [
    'Clean Architecture & Multi-Tenant SaaS (DairyOps)',
    'Biometric Sync across 70+ Devices & ~60K Daily Punches',
    'SQL Server Set-Based Query Optimization (10m → <2m)',
    'Offline-First Sync (SQLite & IndexedDB) & RBAC',
  ],
};

export const HERO_METRICS: MetricItem[] = [
  {
    value: '2.8+ yrs',
    label: 'Production Experience',
    sublabel: '02/2024 – Present · .NET & Angular',
  },
  {
    value: '10m → <2m',
    label: 'SQL Performance Tuning',
    sublabel: 'Set-based stored proc optimization',
  },
  {
    value: '60K+ / day',
    label: 'Biometric Punch Sync',
    sublabel: '70+ devices · 30,000+ employees',
  },
  {
    value: '9.02 CGPA',
    label: 'B.Sc. Computer Science',
    sublabel: 'Savitribai Phule Pune University',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Software Engineer',
    company: 'Emsphere Technologies Private Limited',
    period: '02/2024 – Present',
    location: 'Pune, Maharashtra',
    employmentType: 'Contract Labour Management System (CLMS) · Enterprise HR, Payroll, Attendance & Billing',
    summary:
      'Developing and optimizing core modules, high-volume biometric synchronization services, and onboarding API integrations for an enterprise Contract Labour Management System (CLMS).',
    impactGroups: [
      {
        area: 'CLMS Modules & Onboarding APIs',
        points: [
          'Developed and maintained enterprise modules for Employee Management, Onboarding, Attendance, Salary Processing, and Contractor Billing using ASP.NET Core Web API, ASP.NET MVC, C#, and SQL Server.',
          'Automated configurable attendance business rules using SQL-based validation logic for overtime and consecutive present/absent patterns, saving approximately 10 hours per month of manual HR intervention.',
          'Integrated Aadhaar Verification and Clearout Email Verification APIs into employee onboarding workflows to validate employee identity and block invalid or disposable emails.',
        ],
      },
      {
        area: 'High-Volume Biometric Synchronization',
        points: [
          'Designed and implemented biometric device synchronization services integrating Smartface, Alpeta, and ZKTeco for employee creation, updates, transfers, department changes, and status sync across 70+ devices and 30,000+ employees.',
          'Built high-volume attendance import and synchronization pipelines with duplicate validation, incremental processing, and partial failure handling across approximately 60,000 daily punch records.',
        ],
      },
      {
        area: 'SQL Tuning & Code Quality',
        points: [
          'Optimized SQL Server stored procedures, functions, and complex queries by tuning joins/filters and replacing row-by-row operations with set-based processing, cutting execution time from ~10 minutes to under 2 minutes.',
          'Improved application maintainability by resolving 100+ SonarQube issues, refactoring duplicated logic, and simplifying conditional complexity.',
        ],
      },
    ],
    technologies: [
      'ASP.NET Core Web API',
      'ASP.NET MVC',
      'C#',
      'SQL Server',
      'Windows / Background Services',
      'Smartface · Alpeta · ZKTeco',
      'Aadhaar & Clearout APIs',
      'SonarQube',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'fa-solid fa-code',
    subtitle: 'Core strongly-typed & query languages',
    items: ['C#', 'SQL', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend & Services',
    icon: 'fa-solid fa-server',
    subtitle: 'APIs, ORMs, real-time & background workers',
    items: [
      '.NET Core',
      '.NET Framework',
      'ASP.NET Core Web API',
      'ASP.NET MVC',
      'Entity Framework Core',
      'Dapper',
      'SignalR',
      'Windows & Background Services',
    ],
  },
  {
    title: 'Frontend & Mobile',
    icon: 'fa-solid fa-layer-group',
    subtitle: 'SPAs, static sites, PWA & mobile apps',
    items: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Capacitor',
      'PWA',
      'React Native',
      'Tailwind CSS',
      'jQuery',
      'Ajax',
    ],
  },
  {
    title: 'Databases & Persistence',
    icon: 'fa-solid fa-database',
    subtitle: 'Server-side & offline-first storage',
    items: ['SQL Server', 'PostgreSQL', 'SQLite', 'IndexedDB', 'Stored Procedures', 'Query Optimization'],
  },
  {
    title: 'Architecture & Patterns',
    icon: 'fa-solid fa-diagram-project',
    subtitle: 'Maintainable, multi-tenant system design',
    items: [
      'Clean Architecture',
      'Repository & Unit of Work',
      'Dependency Injection',
      'SOLID',
      'Outbox Pattern',
      'Multi-Tenancy',
    ],
  },
  {
    title: 'Security & Integrations',
    icon: 'fa-solid fa-shield-halved',
    subtitle: 'Auth, hardware SDKs & external APIs',
    items: [
      'JWT Authentication',
      'Role-Based Access Control (RBAC)',
      'REST API Integration',
      'Firebase Cloud Messaging (FCM)',
      'Biometric Device Integration',
      'Aadhaar & Clearout APIs',
    ],
  },
  {
    title: 'Cloud & Deployment',
    icon: 'fa-solid fa-cloud',
    subtitle: 'Production hosting, reverse proxy & containers',
    items: ['AWS EC2', 'Nginx', 'Azure App Service', 'Docker (basics)'],
  },
  {
    title: 'Tools & Code Quality',
    icon: 'fa-solid fa-screwdriver-wrench',
    subtitle: 'Delivery workflow, API docs & static analysis',
    items: ['Git', 'Postman', 'Swagger / OpenAPI', 'SonarQube', 'Visual Studio', 'VS Code'],
  },
];

/**
 * EXTENSIBLE PROJECTS REGISTRY
 * ----------------------------
 * To showcase additional projects in the future, append a new `ProjectItem` object
 * to this array. Categories, filter tabs, grid cards, and detail modals update automatically.
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: 'dairyops',
    title: 'DairyOps — Dairy Management Platform',
    tagline: 'Multi-tenant SaaS & offline-first mobile platform live in production at Shivaar Farms.',
    category: 'Full-Stack SaaS',
    featured: true,
    role: 'Creator & Full-Stack Architect (Live at Shivaar Farms)',
    summary:
      'A multi-tenant dairy management SaaS platform live in production at Shivaar Farms, supporting multiple milk collection centers, farmer management, daily milk collection, FAT/SNF-based pricing, billing, and automated payment cycles.',
    architectureNotes:
      'Built with ASP.NET Core 8 Clean Architecture, PostgreSQL, and tenant-aware RBAC, deployed on AWS EC2 with Nginx. Engineered for rural connectivity with cursor-based pagination & DTO projection (~30% smaller payloads) plus zero-data-loss offline persistence via SQLite on Android and IndexedDB on web.',
    architectureDiagram: [
      {
        layer: '01 · Client & Offline',
        component: 'Angular 21 + Capacitor',
        details: 'Signals UI · SQLite (Android) & IndexedDB (Web) local-first store',
        linkLabel: 'Idempotent Sync',
      },
      {
        layer: '02 · API & Security',
        component: 'JWT Auth · Tenant RBAC',
        details: 'Feature-based access control, cursor pagination & DTO projection (-30%)',
        linkLabel: 'Clean Arch',
      },
      {
        layer: '03 · Finance Engine',
        component: 'ASP.NET Core 8 Services',
        details: 'Daily collection aggregation, FAT/SNF rate engine & automated deductions',
        linkLabel: 'EF Core',
      },
      {
        layer: '04 · Persistence',
        component: 'PostgreSQL',
        details: 'Multi-tenant isolated collections, deductions & ledger statements',
      },
    ],
    highlights: [
      'Built a multi-tenant dairy management SaaS platform supporting multiple milk collection centers, farmer management, daily milk collection, FAT/SNF-based pricing, billing, and payment processing.',
      'Designed the backend with Clean Architecture, JWT authentication, feature-based access control, and tenant-level data isolation for Super Admin, Center Admin, and Farmer roles.',
      'Built a finance and payment cycle engine that aggregates daily collections, applies quality-based rates and deductions, and generates payment statements.',
      'Prevented data loss in low-connectivity areas (zero lost entries during network outages) by storing entries locally first (SQLite on Android, IndexedDB on web) and syncing idempotently when connectivity returns.',
      'Optimized mobile APIs using cursor-based pagination and DTO projection, reducing response payload sizes by ~30%.',
      'Built an Angular 21 mobile-first frontend with Standalone Components and Signals, packaged via Capacitor, and deployed on AWS EC2 behind Nginx.',
    ],
    techStack: [
      'Angular 21',
      'TailwindCSS v4',
      'Capacitor',
      'ASP.NET Core 8',
      'EF Core',
      'PostgreSQL',
      'SQLite',
      'AWS EC2',
      'Nginx',
    ],
    liveUrl: 'https://dairyops.app',
  },
  {
    id: 'ecologix',
    title: 'Ecologix — Recycling Management Platform',
    tagline: 'Role-based logistics & state-validated pickup workflow platform powered by .NET 8 and React Native.',
    category: 'Workflow & APIs',
    featured: true,
    role: 'Backend & Mobile Workflow Engineer',
    summary:
      'A role-based recycling management platform coordinating vendors, admins, drivers, and recycling-center floor managers through a strict, auditable end-to-end collection lifecycle.',
    architectureNotes:
      'Built with a .NET Core 8 backend and PostgreSQL enforcing role-based authorization and workflow-state validation, paired with a React Native mobile experience so users can only execute actions permitted by their role and current request state.',
    architectureDiagram: [
      {
        layer: '01 · Role Clients',
        component: 'React Native Mobile',
        details: 'Vendor, Admin, Driver & Recycling Floor Manager interfaces',
        linkLabel: 'REST + Auth',
      },
      {
        layer: '02 · State Guard',
        component: '.NET Core 8 API & RBAC',
        details: 'Role-permission checks + workflow-state transition validation',
        linkLabel: 'Domain Rules',
      },
      {
        layer: '03 · Persistence',
        component: 'PostgreSQL',
        details: 'Consistent multi-stage pickup, trailer assignment & inventory records',
      },
    ],
    workflowSteps: [
      'Vendor Request',
      'Admin Approval',
      'Driver / Trailer Assignment',
      'Collection',
      'Recycling-Center Verification',
    ],
    highlights: [
      'Implemented the complete pickup workflow from vendor request through admin approval, driver/trailer assignment, collection, and recycling-center verification.',
      'Developed .NET Core 8 APIs and business rules for request management, approval workflows, driver assignments, shipment verification, and inventory movement.',
      'Implemented role-based authorization and workflow-state validation to ensure users could perform only actions permitted by their role and the current request state.',
      'Maintained data consistency in PostgreSQL across multiple workflow stages where different users update the same business transaction.',
    ],
    techStack: ['.NET Core 8', 'React Native', 'PostgreSQL'],
  },
  {
    id: 'pdf-transformation-viewer',
    title: 'PDF Document Transformation & Viewer',
    tagline: 'Legacy diagnostic manual digitization pipeline converting PDFs into HTML, XML, and JSON with an Angular web viewer.',
    category: 'Data & Tooling',
    featured: false,
    role: 'Pipeline & Frontend Engineer',
    summary:
      'A document digitization pipeline and modern web viewer converting legacy structured PDF documents, including complex diagnostic manuals, into standardized HTML, XML, and JSON formats based on client-specific data requirements.',
    architectureNotes:
      'Decoupled Python extraction and hierarchical restructuring scripts convert legacy PDF layouts into semantic HTML, schema-consistent XML, and JSON consumed directly by an Angular viewer for fast search, navigation, and downstream application integration.',
    architectureDiagram: [
      {
        layer: '01 · Ingestion',
        component: 'Legacy PDF Manuals',
        details: 'Complex diagnostic tables, headings & nested sections',
        linkLabel: 'Extract',
      },
      {
        layer: '02 · Transform',
        component: 'Python Parser Pipeline',
        details: 'Hierarchy preservation & client schema normalization',
        linkLabel: 'Emit Artifacts',
      },
      {
        layer: '03 · Standardized',
        component: 'HTML5 · XML · JSON',
        details: 'Structured, machine-readable document & content models',
        linkLabel: 'Consume',
      },
      {
        layer: '04 · Viewer',
        component: 'Angular Web Viewer',
        details: 'Searchable, navigable technical documentation UI',
      },
    ],
    workflowSteps: [
      'Legacy PDF Manuals',
      'Python Extraction Scripts',
      'HTML / XML / JSON',
      'Angular Web Viewer',
    ],
    highlights: [
      'Built Python-based data transformation scripts to extract, restructure, and transform PDF content into structured HTML, XML, and JSON formats while preserving document hierarchy and relationships.',
      'Developed an Angular-based web viewer consuming generated HTML and JSON payloads to render technical manuals in a clean, navigable interface.',
      'Designed the transformation and presentation flow to make legacy document content searchable, accessible, and usable through a modern web interface.',
      'Mapped complex business document structures into a standardized data model suitable for downstream applications and web visualization.',
    ],
    techStack: ['Python', 'HTML5', 'XML', 'JSON', 'Angular'],
  },
  {
    id: 'salezii-studio',
    title: 'Salezii — 3D Visualization & Digital Studio',
    tagline: 'Static-page Angular web application for an industrial 3D product visualization and marketing studio.',
    category: 'Brand & Static Web',
    featured: false,
    role: 'Frontend Angular Developer',
    summary:
      'Designed and built the static-page Angular web presence for Salezii Technologies, an industrial product marketing and 3D visualization studio transforming complex engineering CAD/machinery into visual digital experiences.',
    architectureNotes:
      'Engineered as a fast, SEO-friendly static-page Angular application structured around the studio’s core capability pillars (Show, Build, Explain, Reach), responsive showcase layouts, and clean conversion funnels.',
    highlights: [
      'Built a multi-page static Angular web application presenting 3D industrial visualization, browser-based 3D viewers, visual SOPs, and digital marketing capabilities.',
      'Structured clear pillar-driven navigation (Show, Build, Explain, Reach) to communicate complex engineering and industrial offerings concisely.',
      'Delivered responsive layouts, fast static page transitions, and clean technical typography tailored to B2B manufacturing and deep-tech audiences.',
    ],
    techStack: ['Angular', 'TypeScript', 'Static Pages', 'Responsive UI', 'SEO'],
    liveUrl: 'https://salezii.com',
  },
  {
    id: 'shivshahi-biryani',
    title: 'Shivshahi Biryani — Menu-First Restaurant Website',
    tagline: 'Static-page Angular website crafted around a fast, menu-first browsing and ordering journey.',
    category: 'Brand & Static Web',
    featured: false,
    role: 'Frontend Angular Developer',
    summary:
      'Built a customer-facing, menu-first restaurant website in Angular for Shivshahi Biryani (Mumbai), engineered to let visitors browse dishes, explore categories, and place orders effortlessly across mobile and desktop.',
    architectureNotes:
      'Architected as a lightweight static-page Angular application prioritizing mobile speed, instant category filtering, visual menu cards, and frictionless action-oriented CTAs (direct order, delivery links, call, and party orders).',
    highlights: [
      'Designed a menu-first user journey enabling customers to browse biryani categories, dish details, and pricing without friction.',
      'Implemented interactive category filtering, structured menu cards, and visual food presentations optimized for mobile diners.',
      'Integrated action-oriented conversion CTAs including direct ordering links, click-to-call, party-order inquiries, and store location info.',
    ],
    techStack: ['Angular', 'TypeScript', 'Static Pages', 'Responsive UI'],
    liveUrl: 'https://salezii.com/our-work/shivshahi-biryani-website',
  },
];

export const EDUCATION: EducationItem = {
  degree: 'B.Sc. Computer Science',
  institution: 'Savitribai Phule Pune University',
  period: '06/2019 – 04/2023',
  location: 'Pune, Maharashtra',
  cgpa: '9.02 / 10',
  coursework: [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Software Engineering',
    'Web Development',
    'Computer Networks',
    'Object-Oriented Programming',
  ],
  languages: ['English', 'Hindi', 'Marathi'],
};
