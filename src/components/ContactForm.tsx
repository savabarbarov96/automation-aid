
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
    name: "",
    email: "",
    phone: "",
    company: "",
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {step === 1 ? "What service do you need?" : "Contact Information"}
      </h2>

      {step === 1 ? (
        <RadioGroup
          defaultValue={formData.service}
          onValueChange={handleServiceSelect}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/5 cursor-pointer">
            <RadioGroupItem value="software" id="software" />
            <Label htmlFor="software" className="cursor-pointer flex-1">Software Development</Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/5 cursor-pointer">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai" className="cursor-pointer flex-1">AI Solutions</Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/5 cursor-pointer">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="cursor-pointer flex-1">Software & AI</Label>
          </div>
        </RadioGroup>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              required
              value={formData.company}
              onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
