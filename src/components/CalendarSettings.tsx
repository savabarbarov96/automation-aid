import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploader } from "./blog/ImageUploader";
import { Loader2, Calendar, User, Clock } from "lucide-react";

interface CalendarSettings {
  id?: string;
  consultant_name: string;
  photo_url?: string;
  working_hours: {
    start: string;
    end: string;
    days: string[];
  };
  is_active: boolean;
}

export const CalendarSettings = () => {
  const [settings, setSettings] = useState<CalendarSettings>({
    consultant_name: "Консултант",
    photo_url: "",
    working_hours: {
      start: "09:00",
      end: "17:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    is_active: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          id: data.id,
          consultant_name: data.consultant_name,
          photo_url: data.photo_url || "",
          working_hours: data.working_hours,
          is_active: data.is_active
        });
      }
    } catch (error) {
      console.error('Error fetching calendar settings:', error);
      toast({
        title: "Грешка",
        description: "Не можахме да заредим настройките на календара",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const settingsData = {
        consultant_name: settings.consultant_name,
        photo_url: settings.photo_url,
        working_hours: settings.working_hours,
        is_active: settings.is_active,
        updated_at: new Date().toISOString()
      };

      if (settings.id) {
        const { error } = await supabase
          .from('calendar_settings')
          .update(settingsData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('calendar_settings')
          .insert([settingsData])
          .select()
          .single();

        if (error) throw error;
        setSettings(prev => ({ ...prev, id: data.id }));
      }

      toast({
        title: "Успешно!",
        description: "Настройките на календара са запазени",
      });
    } catch (error) {
      console.error('Error saving calendar settings:', error);
      toast({
        title: "Грешка",
        description: "Не можахме да запазим настройките",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setSettings(prev => ({ ...prev, photo_url: url }));
  };

  const handleTimeChange = (field: 'start' | 'end', value: string) => {
    setSettings(prev => ({
      ...prev,
      working_hours: {
        ...prev.working_hours,
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Настройки на календара</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Информация за консултанта
          </CardTitle>
          <CardDescription>
            Настройте как ще се показва консултантът в календара за резервации
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="consultant_name">Име на консултанта</Label>
            <Input
              id="consultant_name"
              value={settings.consultant_name}
              onChange={(e) => setSettings(prev => ({ ...prev, consultant_name: e.target.value }))}
              placeholder="Въведете име на консултанта"
            />
          </div>

          <div className="space-y-2">
            <Label>Снимка на консултанта</Label>
            <ImageUploader onImageUpload={handleImageUpload} />
            {settings.photo_url && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Текуща снимка:</p>
                <img 
                  src={settings.photo_url} 
                  alt="Консултант" 
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Работно време
          </CardTitle>
          <CardDescription>
            Настройте работните часове за резервации
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">Начало</Label>
              <Input
                id="start_time"
                type="time"
                value={settings.working_hours.start}
                onChange={(e) => handleTimeChange('start', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">Край</Label>
              <Input
                id="end_time"
                type="time"
                value={settings.working_hours.end}
                onChange={(e) => handleTimeChange('end', e.target.value)}
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Работни дни: Понеделник - Петък</p>
            <p>Резервациите се приемат в рамките на работното време</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Преглед</CardTitle>
          <CardDescription>
            Как ще изглежда календарът за клиентите
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              {settings.photo_url && (
                <img 
                  src={settings.photo_url} 
                  alt={settings.consultant_name}
                  className="w-12 h-12 object-cover rounded-full border-2 border-primary"
                />
              )}
              <div>
                <h3 className="font-semibold">{settings.consultant_name}</h3>
                <p className="text-sm text-gray-600">
                  Достъпен: {settings.working_hours.start} - {settings.working_hours.end}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Запазване...
            </>
          ) : (
            "Запази настройките"
          )}
        </Button>
      </div>
    </div>
  );
};