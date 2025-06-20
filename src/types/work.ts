export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  detailed_description?: string;
  technologies?: string[];
  client?: string;
  duration?: string;
  team_size?: number;
  status?: 'active' | 'completed' | 'in_progress';
  gallery?: GalleryItem[];
  documentation_url?: string;
}

export interface Category {
  id?: string;
  name: string;
  created_at?: string;
}
