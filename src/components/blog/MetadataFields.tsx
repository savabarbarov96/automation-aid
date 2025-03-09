
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { slugify } from "@/lib/utils";
import { User } from "@/types/blog";

interface MetadataFieldsProps {
  title: string;
  slug: string;
  author: string;
  created_by: string | null;
  users: User[];
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onUserChange: (userId: string) => void;
  isEditing: boolean;
}

export const MetadataFields = ({
  title,
  slug,
  author,
  created_by,
  users,
  onTitleChange,
  onSlugChange,
  onAuthorChange,
  onUserChange,
  isEditing
}: MetadataFieldsProps) => {
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    onTitleChange(newTitle);
    
    // Auto-generate slug from title if not editing an existing post
    if (!isEditing) {
      onSlugChange(slugify(newTitle));
    }
  };

  const handleUserSelect = (userId: string) => {
    onUserChange(userId);
    
    // If we have a user selected, automatically set the author name
    if (userId) {
      const selectedUser = users.find(user => user.id === userId);
      if (selectedUser) {
        onAuthorChange(selectedUser.full_name || selectedUser.username);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Заглавие</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Заглавие на публикацията"
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">URL Идентификатор (slug)</Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
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
          value={created_by || undefined}
          onValueChange={handleUserSelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Избери потребител" />
          </SelectTrigger>
          <SelectContent>
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
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          placeholder="Име на автора"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Това е името, което ще се вижда публично
        </p>
      </div>
    </div>
  );
};
