
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { UploadCloud, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      const files = event.target.files;
      if (!files || files.length === 0) {
        return;
      }
      
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;
      
      // Check if storage bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const blogBucket = buckets?.find(bucket => bucket.name === 'blog-images');
      
      if (!blogBucket) {
        // Create the bucket if it doesn't exist
        await supabase.storage.createBucket('blog-images', {
          public: true,
          fileSizeLimit: 10485760 // 10MB limit
        });
      }
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
        
      // Set the image URL
      onChange(data.publicUrl);
      
      toast({
        title: "Успешно качване",
        description: "Изображението беше качено успешно",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Грешка",
        description: error.message || "Неуспешно качване на изображение",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleClearImage = () => {
    onChange("");
  };
  
  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Основно изображение" 
            className="w-full h-40 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={handleClearImage}
            className="absolute top-2 right-2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 text-sm text-muted-foreground">
            Качете изображение или посочете URL
          </p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={uploading}
          className="flex-1"
        >
          {uploading ? "Качване..." : "Качи изображение"}
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
