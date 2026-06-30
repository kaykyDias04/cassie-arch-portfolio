export interface Project {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: 'Arquitetura' | 'Urbanismo' | 'Interiores';
  coverImage: string;
  content: string;
  createdAt: string;
}

export type ProjectCategory = 'Todos' | 'Arquitetura' | 'Urbanismo' | 'Interiores';

export interface AboutData {
  photo: string;
  paragraphs: string[];
}
