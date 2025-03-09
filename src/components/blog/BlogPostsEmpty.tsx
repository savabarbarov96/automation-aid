import { Loader2, FileText } from "lucide-react";

interface BlogPostsEmptyProps {
  isLoading: boolean;
}

export const BlogPostsEmpty = ({ isLoading }: BlogPostsEmptyProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary/70" />
        <p className="text-lg font-medium">Зареждане на публикации...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border border-dashed border-border rounded-lg bg-muted/20">
      <FileText className="h-12 w-12 mb-4 text-muted-foreground/50" />
      <p className="text-lg font-medium mb-1">Няма публикации</p>
      <p className="text-sm">Използвайте бутона "Нова публикация", за да създадете първата.</p>
    </div>
  );
};
