
import { Button } from "@/components/ui/button";
import { Project } from "@/types/work";
import { useProjectForm } from "./hooks/useProjectForm";
import { ProjectBasicInfo } from "./components/ProjectBasicInfo";
import { ProjectCategorySelect } from "./components/ProjectCategorySelect";
import { ProjectImageUploader } from "./components/ProjectImageUploader";

interface ProjectFormProps {
  currentProject: Project | null;
  onSuccess: () => void;
}

export const ProjectForm = ({ currentProject, onSuccess }: ProjectFormProps) => {
  const {
    loading,
    categories,
    uploadError,
    formData,
    setUploadError,
    handleChange,
    handleCategoryChange,
    handleImageChange,
    handleSubmit
  } = useProjectForm(currentProject, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <ProjectBasicInfo 
          formData={formData} 
          handleChange={handleChange} 
        />

        <ProjectCategorySelect 
          selectedCategory={formData.category} 
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />

        <ProjectImageUploader 
          initialImage={formData.image}
          onImageUploaded={handleImageChange}
          uploadError={uploadError}
        />
      </div>

      <Button type="submit" disabled={loading || categories.length === 0} className="w-full">
        {loading ? "Запазване..." : currentProject ? "Обнови проекта" : "Създай проект"}
      </Button>
    </form>
  );
};
