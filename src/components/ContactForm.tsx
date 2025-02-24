
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    service: "",
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleServiceSelect = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            company: formData.company,
            message: formData.message,
            purpose: formData.service,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "We'll be in touch soon.",
      });

      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {step === 1 ? "What service do you need?" : "Contact Information"}
      </h2>

      {step === 1 ? (
        <RadioGroup
          defaultValue={formData.service}
          onValueChange={handleServiceSelect}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <RadioGroupItem value="software" id="software" />
            <Label htmlFor="software" className="cursor-pointer flex-1 text-white/90">Software Development</Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai" className="cursor-pointer flex-1 text-white/90">AI Solutions</Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-white/20 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="cursor-pointer flex-1 text-white/90">Software & AI</Label>
          </div>
        </RadioGroup>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white/90">Company Name *</Label>
            <Input
              id="company"
              required
              value={formData.company}
              onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90">Your Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/90">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/90">Message *</Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setStep(1)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
