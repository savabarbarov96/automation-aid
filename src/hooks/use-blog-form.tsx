import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { BlogPost, User } from "@/types/blog";
import { useAuth } from "@/lib/auth";

interface UseBlogFormProps {
  currentPost: BlogPost | null;
  onSuccess: () => void;
}

export const useBlogForm = ({ currentPost, onSuccess }: UseBlogFormProps) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    author: "",
    is_published: false,
    category: "",
    tags: [],
    published_at: null,
    created_by: null
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch available blog users
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_users')
          .select('id, username, full_name, is_active')
          .eq('is_active', true);
          
        if (error) throw error;
        setUsers(data as User[] || []);
      } catch (error: any) {
        console.error("Error fetching users:", error);
        setError(`Error fetching users: ${error.message}`);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentPost) {
      console.log("Setting form data from current post:", currentPost);
      setFormData({
        ...currentPost,
        // Ensure we don't pass undefined values that could cause issues
        title: currentPost.title || "",
        slug: currentPost.slug || "",
        content: currentPost.content || "",
        excerpt: currentPost.excerpt || "",
        featured_image: currentPost.featured_image || "",
        author: currentPost.author || "",
        is_published: currentPost.is_published || false,
        category: currentPost.category || "",
        tags: currentPost.tags || [],
        published_at: currentPost.published_at || null,
        created_by: currentPost.created_by || (currentUser ? currentUser.id : null)
      });
    } else {
      // For new posts, initialize with current user if available
      setFormData({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featured_image: "",
        author: currentUser ? (currentUser.full_name || currentUser.username || "") : "",
        is_published: false,
        category: "",
        tags: [],
        published_at: null,
        created_by: currentUser ? currentUser.id : null
      });
    }
  }, [currentPost, currentUser]);

  // Update form field handlers
  const updateField = <K extends keyof BlogPost>(field: K, value: BlogPost[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create a clean copy of the form data with only the fields we need
      const postData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        featured_image: formData.featured_image,
        author: formData.author,
        is_published: formData.is_published,
        category: formData.category,
        tags: formData.tags,
        published_at: formData.published_at,
        created_by: formData.created_by,
        // Include these only if they exist in the current post
        ...(formData.created_at ? { created_at: formData.created_at } : {}),
        ...(formData.updated_at ? { updated_at: new Date().toISOString() } : {})
      };

      // Add published_at timestamp if publishing for the first time
      if (formData.is_published && (!currentPost || !currentPost.is_published)) {
        postData.published_at = new Date().toISOString();
      }

      // Make sure we have a created_by value if the current user is logged in
      if (!postData.created_by && currentUser) {
        postData.created_by = currentUser.id;
      }

      // Make sure we have an author
      if (!postData.author && currentUser) {
        postData.author = currentUser.full_name || currentUser.username || "";
      }

      console.log("Saving post data:", postData);
      
      let response;
      
      if (currentPost?.id) {
        // Update existing post
        response = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', currentPost.id);
      } else {
        // Create new post
        response = await supabase
          .from('blog_posts')
          .insert(postData);
      }

      if (response.error) {
        throw response.error;
      }

      toast({
        title: currentPost ? "Публикацията е обновена" : "Публикацията е създадена",
        description: "Промените са запазени успешно.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error saving post:", error);
      setError(error.message || "Неуспешно запазване на публикацията.");
      toast({
        title: "Грешка",
        description: error.message || "Неуспешно запазване на публикацията.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error, 
    users,
    setError,
    updateField,
    handleSubmit
  };
};
