
import { Button } from "@/components/ui/button";

interface BlogFormErrorProps {
  error: string;
  onRetry: () => void;
}

export const BlogFormError = ({ error, onRetry }: BlogFormErrorProps) => {
  return (
    <div className="bg-destructive/10 p-4 rounded-md border border-destructive mb-4">
      <h3 className="font-medium text-destructive">Възникна грешка:</h3>
      <p>{error}</p>
      <Button 
        onClick={onRetry}
        className="mt-2 text-sm text-primary underline"
        variant="link"
      >
        Опитайте отново
      </Button>
    </div>
  );
};
