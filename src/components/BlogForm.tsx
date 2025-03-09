
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { slugify } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BlogForm = ({ currentPost, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    // Fetch available blog users
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_users')
          .select('id, username, full_name')
          .eq('is_active', true);
          
        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentPost) {
      setFormData({
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
        created_by: currentPost.created_by || null
      });
    }
  }, [currentPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Auto-generate slug from title
    if (name === "title" && (!currentPost || !currentPost.slug)) {
      setFormData(prev => ({
        ...prev,
        slug: slugify(value)
      }));
    }
  };

  const handleTogglePublish = (checked) => {
    setFormData({
      ...formData,
      is_published: checked
    });
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(",").map(tag => tag.trim());
    setFormData({
      ...formData,
      tags: tagsArray
    });
  };

  const handleUserChange = (userId) => {
    setFormData({
      ...formData,
      created_by: userId
    });
    
    // If we have a user selected, automatically set the author name
    if (userId) {
      const selectedUser = users.find(user => user.id === userId);
      if (selectedUser) {
        setFormData(prev => ({
          ...prev,
          author: selectedUser.full_name || selectedUser.username
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
      };

      // Add published_at timestamp if publishing for the first time
      if (formData.is_published && (!currentPost || !currentPost.is_published)) {
        postData.published_at = new Date().toISOString();
      }

      let response;
      
      if (currentPost) {
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
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Грешка",
        description: error.message || "Неуспешно запазване на публикацията.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Заглавие</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Заглавие на публикацията"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">URL Идентификатор (slug)</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="url-identifier"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Използва се в URL адреса: /blog/url-identifier
          </p>
        </div>

        <div>
          <Label htmlFor="created_by">Автор (потребител)</Label>
          <Select 
            value={formData.created_by || ""} 
            onValueChange={handleUserChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Избери потребител" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Не е избран</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.full_name || user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="author">Име на автор</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Име на автора"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Това е името, което ще се вижда публично
          </p>
        </div>

        <div>
          <Label htmlFor="excerpt">Кратко резюме</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Кратко резюме на публикацията"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="content">Съдържание</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Съдържание на публикацията..."
            rows={10}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Поддържа се markdown форматиране.
          </p>
        </div>

        <div>
          <Label htmlFor="featured_image">URL на основно изображение</Label>
          <Input
            id="featured_image"
            name="featured_image"
            value={formData.featured_image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="category">Категория</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Категория"
          />
        </div>

        <div>
          <Label htmlFor="tags">Тагове (разделени със запетая)</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            placeholder="таг1, таг2, таг3"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={handleTogglePublish}
          />
          <Label htmlFor="is_published">Публикувай</Label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Запазване..." : currentPost ? "Обнови публикацията" : "Създай публикация"}
      </Button>
    </form>
  );
};
