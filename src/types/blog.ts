
// Custom type definitions for blog-related data
export interface User {
  id: string;
  username: string;
  full_name: string;
  email?: string;
  is_active: boolean;
  created_at?: string;
  password?: string; // Only used for forms, not displayed
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: string;
  is_published: boolean;
  category: string;
  tags: string[];
  published_at: string | null;
  created_by: string | null;
  created_at?: string;
  updated_at?: string;
}
