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
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft, Mail, Phone, MessageSquare, Building, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  onSuccess?: () => void;
}

type ContactMethod = 'email' | 'phone' | 'both';

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleServiceSelect = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    setStep(2);
  };

  const handleContactMethodSelect = (value: string) => {
    setFormData(prev => ({ ...prev, contactMethod: value as ContactMethod }));
  };

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(formData));
  }, [formData]);

  // Real-time validation
  const validateField = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Моля въведете валиден имейл адрес';
        }
        break;
      case 'name':
        if (value && value.length < 2) {
          error = 'Името трябва да е поне 2 символа';
        }
        break;
      case 'company':
        if (value && value.length < 2) {
          error = 'Името на компанията трябва да е поне 2 символа';
        }
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (value) {
      validateField(field, value);
    } else {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Каква услуга търсите?";
      case 2:
        return "Вашите данни за контакт";
      case 3:
        return "Разкажете ни повече";
      default:
        return "Свържете се с нас";
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

      await sendDiscordNotification();

      toast({
        title: "Успешно!",
        description: "Ще се свържем с вас скоро.",
      });

      // Clear saved form data
      localStorage.removeItem('contactFormData');
      
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

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const progressPercentage = ((step - 1) / 2) * 100;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-background/80 rounded-lg p-6 sm:p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{getStepTitle()}</h2>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-6">
            <div 
              className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span className={step >= 1 ? "text-primary" : ""}>Услуга</span>
            <span className={step >= 2 ? "text-primary" : ""}>Контакт</span>
            <span className={step >= 3 ? "text-primary" : ""}>Детайли</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ServiceCard
                  title="Недвижими имоти"
                  description="ImotiDesk CRM за брокерски агенции и управление на имоти"
                  selected={formData.service === "real_estate"}
                  onClick={() => handleServiceSelect("real_estate")}
                  icon="🏢"
                />
                <ServiceCard
                  title="Туризъм и хотелиерство"
                  description="MenuMaster дигитални менюта и Property Pro за вили"
                  selected={formData.service === "hospitality"}
                  onClick={() => handleServiceSelect("hospitality")}
                  icon="🍽️"
                />
                <ServiceCard
                  title="Фитнес и здраве"
                  description="FitManager за зали и AI персонализирани планове"
                  selected={formData.service === "fitness"}
                  onClick={() => handleServiceSelect("fitness")}
                  icon="💪"
                />
                <ServiceCard
                  title="Персонализирано решение"
                  description="Създаване на специализиран софтуер за вашия бизнес"
                  selected={formData.service === "custom"}
                  onClick={() => handleServiceSelect("custom")}
                  icon="⚙️"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2 text-white/90">
                    <Building className="h-4 w-4 text-primary/80" />
                    Име на компанията *
                  </Label>
                  <div className="relative">
                    <Input
                      id="company"
                      ref={companyInputRef}
                      required
                      value={formData.company}
                      onChange={e => handleInputChange('company', e.target.value)}
                      className={cn(
                        "bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20 pl-3",
                        fieldErrors.company && "border-red-500"
                      )}
                      placeholder="Вашата компания"
                    />
                    {fieldErrors.company && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.company}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-white/90">
                    <User className="h-4 w-4 text-primary/80" />
                    Вашето име *
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className={cn(
                        "bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20 pl-3",
                        fieldErrors.name && "border-red-500"
                      )}
                      placeholder="Вашето име"
                    />
                    {fieldErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/90">Предпочитан начин за контакт *</Label>
                  <RadioGroup 
                    value={formData.contactMethod} 
                    onValueChange={handleContactMethodSelect}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" className="text-primary" />
                      <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                        <Mail className="h-4 w-4 text-primary/80" />
                        Имейл
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" className="text-primary" />
                      <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer">
                        <Phone className="h-4 w-4 text-primary/80" />
                        Телефон
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" className="text-primary" />
                      <Label htmlFor="both" className="cursor-pointer">И двете</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(formData.contactMethod === 'email' || formData.contactMethod === 'both') && (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-white/90">
                      <Mail className="h-4 w-4 text-primary/80" />
                      Имейл адрес *
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        required={formData.contactMethod === 'email' || formData.contactMethod === 'both'}
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className={cn(
                          "bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20 pl-3",
                          fieldErrors.email && "border-red-500"
                        )}
                        placeholder="вашият@имейл.com"
                      />
                      {fieldErrors.email && (
                        <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>
                )}

                {(formData.contactMethod === 'phone' || formData.contactMethod === 'both') && (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-white/90">
                      <Phone className="h-4 w-4 text-primary/80" />
                      Телефонен номер *
                    </Label>
                    <div 
                      className="relative rounded-md overflow-hidden bg-white/5 border border-white/10"
                      style={{ height: '40px' }}
                    >
                      <PhoneInput
                        country={'bg'}
                        value={formData.phone}
                        onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                        inputProps={{
                          id: 'phone',
                          required: formData.contactMethod === 'phone' || formData.contactMethod === 'both',
                        }}
                        containerClass="!w-full"
                        inputClass="!w-full !bg-transparent !border-none !text-white !py-2 !pl-12 !pr-3 !h-10"
                        buttonClass="absolute !left-0 !top-0 !bottom-0 !border-none !bg-transparent"
                        dropdownClass="!bg-background !text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </Button>
                <Button 
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  disabled={!formData.company || !formData.name || 
                    (formData.contactMethod === 'email' && !formData.email) || 
                    (formData.contactMethod === 'phone' && !formData.phone) ||
                    (formData.contactMethod === 'both' && (!formData.email || !formData.phone))}
                >
                  Напред <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-white/90">
                    <MessageSquare className="h-4 w-4 text-primary/80" />
                    Вашето съобщение *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Опишете вашия проект или запитване..."
                    className="min-h-[120px] bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </Button>
                <Button 
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  disabled={isSubmitting || !formData.message}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Изпращане...
                    </>
                  ) : (
                    <>
                      Изпрати <CheckCircle2 className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Service card component
const ServiceCard = ({ title, description, selected, onClick, icon }) => (
  <div 
    className={cn(
      "p-4 rounded-lg border cursor-pointer transition-all duration-200 flex flex-col items-center text-center",
      selected 
        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" 
        : "border-white/10 bg-white/5 hover:bg-white/10"
    )}
    onClick={onClick}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-semibold text-white mb-1">{title}</h3>
    <p className="text-sm text-white/70">{description}</p>
  </div>
);
