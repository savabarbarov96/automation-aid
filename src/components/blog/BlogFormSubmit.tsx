
import { Button } from "@/components/ui/button";

interface BlogFormSubmitProps {
  loading: boolean;
  isEditing: boolean;
}

export const BlogFormSubmit = ({ loading, isEditing }: BlogFormSubmitProps) => {
  return (
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? "Запазване..." : isEditing ? "Обнови публикацията" : "Създай публикация"}
    </Button>
  );
};
