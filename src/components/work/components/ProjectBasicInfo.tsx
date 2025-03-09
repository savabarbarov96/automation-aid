import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/work";
import { RotateCw, FileText, Link as LinkIcon } from "lucide-react";
import { slugify } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ProjectBasicInfoProps {
  formData: Project;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProjectBasicInfo = ({ formData, handleChange }: ProjectBasicInfoProps) => {
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    if (formData.link) {
      try {
        // Check if URL has protocol, add https:// if it doesn't
        const urlWithProtocol = formData.link.startsWith('http') 
          ? formData.link 
          : `https://${formData.link}`;
        
        new URL(urlWithProtocol);
        setIsValidUrl(true);
      } catch (e) {
        setIsValidUrl(false);
      }
    }
  }, [formData.link]);

  const addHttpsIfNeeded = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !value.startsWith('http')) {
      const newEvent = {
        target: {
          name: 'link',
          value: `https://${value}`
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleChange(newEvent);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title" className="flex items-center gap-2 mb-1.5">
          <FileText className="h-4 w-4 text-primary" />
          Заглавие
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Заглавие на проекта"
          className="bg-background"
          required
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Кратко и ясно име на проекта, което ще бъде показано на главната страница
        </p>
      </div>

      <div>
        <Label htmlFor="link" className={`flex items-center gap-2 mb-1.5 ${!isValidUrl ? "text-destructive" : ""}`}>
          <LinkIcon className={`h-4 w-4 ${!isValidUrl ? "text-destructive" : "text-primary"}`} />
          Линк към проекта
        </Label>
        <Input
          id="link"
          name="link"
          value={formData.link}
          onChange={handleChange}
          onBlur={addHttpsIfNeeded}
          placeholder="https://example.com"
          className={`bg-background ${!isValidUrl ? "border-destructive ring-destructive" : ""}`}
          required
        />
        <p className={`text-xs ${!isValidUrl ? "text-destructive" : "text-muted-foreground"} mt-1.5`}>
          {!isValidUrl 
            ? "Моля, въведете валиден URL адрес (напр. https://example.com)" 
            : "Пълният URL адрес, към който ще води бутонът 'Разгледай проекта'"}
        </p>
      </div>

      <div>
        <Label htmlFor="description" className="flex items-center gap-2 mb-1.5">
          <FileText className="h-4 w-4 text-primary" />
          Описание
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Кратко описание на проекта и неговите цели"
          rows={3}
          className="bg-background resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          Кратко и информативно описание (препоръчително: 1-2 изречения)
        </p>
      </div>
    </div>
  );
};
