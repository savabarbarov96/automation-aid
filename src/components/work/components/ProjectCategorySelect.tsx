
import { Category } from "@/types/work";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProjectCategorySelectProps {
  selectedCategory: string;
  categories: Category[];
  onCategoryChange: (value: string) => void;
}

export const ProjectCategorySelect = ({ 
  selectedCategory, 
  categories, 
  onCategoryChange 
}: ProjectCategorySelectProps) => {
  return (
    <div>
      <Label htmlFor="category">Категория</Label>
      <Select 
        value={selectedCategory}
        onValueChange={onCategoryChange}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Изберете категория" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {categories.length === 0 && (
        <Alert variant="default" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Нямате създадени категории. Моля, създайте категория от таб "Категории".
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
