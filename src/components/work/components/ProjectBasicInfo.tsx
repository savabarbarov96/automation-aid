
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/work";

interface ProjectBasicInfoProps {
  formData: Project;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProjectBasicInfo = ({ formData, handleChange }: ProjectBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Заглавие</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Заглавие на проекта"
          required
        />
      </div>

      <div>
        <Label htmlFor="link">Линк</Label>
        <Input
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Описание (незадължително)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Кратко описание на проекта"
          rows={3}
        />
      </div>
    </div>
  );
};
