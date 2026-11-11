export interface ProfileInfo {
  name: string;
  role: string;
  headline: string;
  experienceYears: string;
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  avatarUrl: string;
  resumeUrl: string;
  resumeFileName: string;
  availabilityText: string;
  summary: string;
  engineeringFocus: string[];
}

export interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface ExperienceImpactGroup {
  area: string;
  points: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  employmentType: string;
  summary: string;
  impactGroups: ExperienceImpactGroup[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  subtitle: string;
  items: string[];
}

export type ProjectCategory =
  | 'Full-Stack SaaS'
  | 'Workflow & APIs'
  | 'Data & Tooling'
  | 'Brand & Static Web'
  | 'Enterprise Systems';

export interface ArchitectureNode {
  layer: string;
  component: string;
  details: string;
  linkLabel?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  role: string;
  summary: string;
  architectureNotes: string;
  architectureDiagram?: ArchitectureNode[];
  workflowSteps?: string[];
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  cgpa: string;
  coursework: string[];
  languages?: string[];
}
