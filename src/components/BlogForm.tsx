
import { MetadataFields } from "./blog/MetadataFields";
import { ContentFields } from "./blog/ContentFields";
import { PublishSettings } from "./blog/PublishSettings";
import { BlogFormSubmit } from "./blog/BlogFormSubmit";
import { BlogPost } from "@/types/blog";
import { useBlogForm } from "@/hooks/use-blog-form";
import { BlogFormError } from "./blog/BlogFormError";

interface BlogFormProps {
  currentPost: BlogPost | null;
  onSuccess: () => void;
}

export const BlogForm = ({ currentPost, onSuccess }: BlogFormProps) => {
  const {
    formData,
    loading,
    error,
    users,
    setError,
    updateField,
    handleSubmit
  } = useBlogForm({ currentPost, onSuccess });

  if (error) {
    return <BlogFormError error={error} onRetry={() => setError(null)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg">
      <div className="space-y-6">
        <MetadataFields 
          title={formData.title}
          slug={formData.slug}
          author={formData.author}
          created_by={formData.created_by}
          users={users}
          onTitleChange={(value) => updateField('title', value)}
          onSlugChange={(value) => updateField('slug', value)}
          onAuthorChange={(value) => updateField('author', value)}
          onUserChange={(value) => updateField('created_by', value)}
          isEditing={!!currentPost}
        />

        <ContentFields 
          excerpt={formData.excerpt}
          content={formData.content}
          featured_image={formData.featured_image}
          category={formData.category}
          tags={formData.tags}
          onExcerptChange={(value) => updateField('excerpt', value)}
          onContentChange={(value) => updateField('content', value)}
          onFeaturedImageChange={(value) => updateField('featured_image', value)}
          onCategoryChange={(value) => updateField('category', value)}
          onTagsChange={(value) => updateField('tags', value)}
        />

        <PublishSettings 
          isPublished={formData.is_published}
          onPublishChange={(checked) => updateField('is_published', checked)}
        />
      </div>

      <BlogFormSubmit loading={loading} isEditing={!!currentPost} />
    </form>
  );
};
