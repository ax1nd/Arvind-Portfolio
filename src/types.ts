export type ScreenId = 'hero' | 'alphabet' | 'split' | 'work' | 'contact';

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  discipline: string;
  category: string;
  stack?: string[];
  accentColor: string;
  image: string;
  secondaryImage?: string;
  description: string;
  manifesto: string;
  deliverables: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
}
