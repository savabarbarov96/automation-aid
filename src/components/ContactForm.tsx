
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

interface ContactFormProps {
  onSuccess?: () => void;
}

type ContactMethod = 'email' | 'phone' | 'both';

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [step, setStep] = useState(1);
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

  useEffect(() => {
    if (step === 2 && companyInputRef.current) {
      companyInputRef.current.focus();
    }
  }, [step]);

  const handleContactMethodSelect = (value: ContactMethod) => {
    setFormData(prev => ({ ...prev, contactMethod: value }));
  };

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

  const sendEmail = async () => {
    const response = await fetch('/functions/v1/send-contact-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email function error:', errorData);
      throw new Error(errorData.error || 'Failed to send email');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // First, save to database
      await saveToDatabase();
      
      // Try to send email, but don't block on failure
      try {
        await sendEmail();
      } catch (emailError) {
        // Log email error but don't fail the submission
        console.error('Email sending failed:', emailError);
      }

      // Show success message and trigger success callback
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
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-cool-100/50 to-background/50 backdrop-blur-md rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {step === 1 ? "Каква услуга търсите?" : "Вашите данни за контакт"}
      </h2>

      {step === 1 ? (
        <RadioGroup
          defaultValue={formData.service}
          onValueChange={handleServiceSelect}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
            <RadioGroupItem value="software" id="software" />
            <Label htmlFor="software" className="cursor-pointer flex-1 text-white/90">Разработка на Софтуер</Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai" className="cursor-pointer flex-1 text-white/90">AI Решения</Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="cursor-pointer flex-1 text-white/90">Софтуер & AI</Label>
          </div>
        </RadioGroup>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white/90">Име на компанията *</Label>
              <Input
                id="company"
                ref={companyInputRef}
                required
                value={formData.company}
                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/90">Вашето име *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/90">Предпочитан начин за контакт *</Label>
              <RadioGroup
                value={formData.contactMethod}
                onValueChange={handleContactMethodSelect}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email" className="cursor-pointer text-white/90">Имейл</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="cursor-pointer text-white/90">Телефон</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both-contact" />
                  <Label htmlFor="both-contact" className="cursor-pointer text-white/90">И двете</Label>
                </div>
              </RadioGroup>
            </div>

            {(formData.contactMethod === 'email' || formData.contactMethod === 'both') && (
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Имейл *</Label>
                <Input
                  id="email"
                  type="email"
                  required={formData.contactMethod === 'email' || formData.contactMethod === 'both'}
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50"
                />
              </div>
            )}

            {(formData.contactMethod === 'phone' || formData.contactMethod === 'both') && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/90">Телефон *</Label>
                <PhoneInput
                  country={'bg'}
                  value={formData.phone}
                  onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                  inputClass="!w-full !h-10 !bg-white/10 !border-white/20 !text-white !pl-12"
                  containerClass="!bg-transparent"
                  buttonClass="!bg-white/10 !border-white/20"
                  dropdownClass="!bg-cool-100 !text-white"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/90">Съобщение *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-primary/50 min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setStep(1)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Назад
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Изпрати
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
