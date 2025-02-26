
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  onSuccess?: () => void;
}

type ContactMethod = 'email' | 'phone' | 'both';
type FormStep = 1 | 2 | 3;

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [step, setStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const companyInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    service: "",
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    contactMethod: 'email' as ContactMethod
  });

  const handleServiceSelect = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    setStep(2);
  };

  const handleContactMethodSelect = (value: ContactMethod) => {
    setFormData(prev => ({ ...prev, contactMethod: value }));
  };

  const moveToNextStep = () => {
    if (step === 2) {
      const isValid = formData.company && formData.name && 
        ((formData.contactMethod === 'email' && formData.email) ||
         (formData.contactMethod === 'phone' && formData.phone) ||
         (formData.contactMethod === 'both' && formData.email && formData.phone));
      
      if (!isValid) {
        toast({
          title: "Грешка",
          description: "Моля, попълнете всички задължителни полета.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const moveBackStep = () => {
    if (step > 1) {
      setStep(prev => (prev > 1 ? (prev - 1) as FormStep : prev));
    }
  };

  useEffect(() => {
    if (step === 2 && companyInputRef.current) {
      companyInputRef.current.focus();
    }
  }, [step]);

  const saveToDatabase = async () => {
    const { error: supabaseError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          company: formData.company,
          message: formData.message,
          purpose: formData.service,
          contact_method: formData.contactMethod
        }
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      throw supabaseError;
    }
  };

  const sendDiscordNotification = async () => {
    try {
      const response = await fetch('https://discord.com/api/webhooks/1344263185963683851/cPYVoXYO2bKdcmaLpva7e_dNjPCSqyssCNK5fHXwP60cdl2sfM6u4iFbRAF7_7ipoEzM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: '📬 Ново запитване от уебсайта!',
          embeds: [{
            title: 'Детайли за запитването',
            color: 0x00ff00,
            fields: [
              {
                name: 'Име',
                value: formData.name,
                inline: true
              },
              {
                name: 'Компания',
                value: formData.company,
                inline: true
              },
              {
                name: 'Услуга',
                value: formData.service,
                inline: true
              },
              {
                name: 'Email',
                value: formData.email || 'Не е предоставен',
                inline: true
              },
              {
                name: 'Телефон',
                value: formData.phone || 'Не е предоставен',
                inline: true
              },
              {
                name: 'Предпочитан начин за контакт',
                value: formData.contactMethod,
                inline: true
              },
              {
                name: 'Съобщение',
                value: formData.message || 'Няма съобщение'
              }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send Discord notification');
      }
    } catch (error) {
      console.error('Discord notification error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      await saveToDatabase();
      await sendDiscordNotification();

      toast({
        title: "Успешно!",
        description: "Ще се свържем с вас скоро.",
      });

      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Грешка",
        description: "Нещо се обърка. Моля, опитайте отново.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RadioGroup
            defaultValue={formData.service}
            onValueChange={handleServiceSelect}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2 p-3 sm:p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              <RadioGroupItem value="software" id="software" />
              <Label htmlFor="software" className="cursor-pointer flex-1 text-white/90 text-sm sm:text-base">Разработка на Софтуер</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 sm:p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              <RadioGroupItem value="ai" id="ai" />
              <Label htmlFor="ai" className="cursor-pointer flex-1 text-white/90 text-sm sm:text-base">AI Решения</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 sm:p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both" className="cursor-pointer flex-1 text-white/90 text-sm sm:text-base">Софтуер & AI</Label>
            </div>
          </RadioGroup>
        );
      case 2:
        return (
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="company" className="text-white/90 text-sm">Име на компанията *</Label>
              <Input
                id="company"
                ref={companyInputRef}
                required
                value={formData.company}
                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="h-9 sm:h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50 text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-white/90 text-sm">Вашето име *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="h-9 sm:h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50 text-sm"
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label className="text-white/90 text-sm">Предпочитан начин за контакт *</Label>
              <RadioGroup
                value={formData.contactMethod}
                onValueChange={handleContactMethodSelect}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="cursor-pointer text-white/90 text-sm">Имейл</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="cursor-pointer text-white/90 text-sm">Телефон</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both-contact" />
                  <Label htmlFor="both-contact" className="cursor-pointer text-white/90 text-sm">И двете</Label>
                </div>
              </RadioGroup>
            </div>

            {(formData.contactMethod === 'email' || formData.contactMethod === 'both') && (
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-white/90 text-sm">Имейл *</Label>
                <Input
                  id="email"
                  type="email"
                  required={formData.contactMethod === 'email' || formData.contactMethod === 'both'}
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-9 sm:h-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50 text-sm"
                />
              </div>
            )}

            {(formData.contactMethod === 'phone' || formData.contactMethod === 'both') && (
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="phone" className="text-white/90 text-sm">Телефон *</Label>
                <PhoneInput
                  country={'bg'}
                  value={formData.phone}
                  onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                  inputClass="!w-full !h-9 sm:!h-10 !bg-white/10 !border-white/20 !text-white !pl-12 !text-sm"
                  containerClass="!bg-transparent"
                  buttonClass="!bg-white/10 !border-white/20"
                  dropdownClass="!bg-cool-100 !text-white"
                />
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="message" className="text-white/90 text-sm">Съобщение *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50 min-h-[80px] sm:min-h-[100px] text-sm"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Каква услуга търсите?";
      case 2:
        return "Вашите данни за контакт";
      case 3:
        return "Вашето съобщение";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-cool-100/50 to-background/50 backdrop-blur-md rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {getStepTitle()}
      </h2>

      <form onSubmit={handleSubmit}>
        {renderStep()}
        
        <div className="flex gap-4 pt-4">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={moveBackStep}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Назад
            </Button>
          )}
          {step === 3 ? (
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Изпращане...
                </>
              ) : (
                'Изпрати'
              )}
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={moveToNextStep}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Напред
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
