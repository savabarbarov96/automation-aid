
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PublishSettingsProps {
  isPublished: boolean;
  onPublishChange: (checked: boolean) => void;
}

export const PublishSettings = ({ 
  isPublished, 
  onPublishChange 
}: PublishSettingsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="is_published"
        checked={isPublished}
        onCheckedChange={onPublishChange}
      />
      <Label htmlFor="is_published">Публикувай</Label>
    </div>
  );
};
