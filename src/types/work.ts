
export interface Project {
  id?: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id?: string;
  name: string;
  created_at?: string;
}
