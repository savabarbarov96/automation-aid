import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, CalendarIcon, Clock, User, Building2, Mail, Phone, MessageSquare, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CalendarSettings {
  consultant_name: string;
  photo_url?: string;
  working_hours: {
    start: string;
    end: string;
    days: string[];
  };
}

interface BookingData {
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
}

export const CalendarBooking = () => {
  const [step, setStep] = useState(1); // 1: Calendar, 2: Contact Info
  const [calendarSettings, setCalendarSettings] = useState<CalendarSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();

  const [bookingData, setBookingData] = useState<BookingData>({
    client_name: "",
    client_email: "",
    client_phone: "",
    company_name: "",
    preferred_date: "",
    preferred_time: "",
    message: ""
  });

  useEffect(() => {
    fetchCalendarSettings();
  }, []);

  const fetchCalendarSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setCalendarSettings({
          consultant_name: data.consultant_name,
          photo_url: data.photo_url,
          working_hours: data.working_hours
        });
      }
    } catch (error) {
      console.error('Error fetching calendar settings:', error);
    } finally {
      setIsLoading(false);
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
          content: '📅 Нова резервация за консултация!',
          embeds: [{
            title: 'Детайли за резервацията',
            color: 0x0099ff,
            fields: [
              {
                name: 'Клиент',
                value: bookingData.client_name,
                inline: true
              },
              {
                name: 'Компания',
                value: bookingData.company_name || 'Не е посочена',
                inline: true
              },
              {
                name: 'Email',
                value: bookingData.client_email,
                inline: true
              },
              {
                name: 'Телефон',
                value: bookingData.client_phone || 'Не е предоставен',
                inline: true
              },
              {
                name: 'Дата и час',
                value: `${formatDate(selectedDate!)} в ${selectedTime}`,
                inline: true
              },
              {
                name: 'Съобщение',
                value: bookingData.message || 'Няма съобщение'
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

  // Calendar utility functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const monthNames = [
    'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
    'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];

  const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Combine date and time for the appointment
      const appointmentDateTime = new Date(`${formatDate(selectedDate!)}T${selectedTime}:00`);

      const { error: supabaseError } = await supabase
        .from('appointments')
        .insert([
          {
            client_name: bookingData.client_name,
            client_email: bookingData.client_email,
            client_phone: bookingData.client_phone,
            company_name: bookingData.company_name,
            preferred_date: appointmentDateTime.toISOString(),
            message: bookingData.message,
            status: 'pending'
          }
        ]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw supabaseError;
      }

      await sendDiscordNotification();

      toast({
        title: "Успешно!",
        description: "Вашата резервация е изпратена. Ще се свържем с вас скоро.",
      });

      // Reset form
      setBookingData({
        client_name: "",
        client_email: "",
        client_phone: "",
        company_name: "",
        preferred_date: "",
        preferred_time: "",
        message: ""
      });
      setSelectedDate(null);
      setSelectedTime("");
      setStep(1);
    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: "Грешка",
        description: "Нещо се обърка. Моля, опитайте отново.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const generateTimeSlots = () => {
    if (!calendarSettings) return [];
    
    const { start, end } = calendarSettings.working_hours;
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    const slots = [];
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    return slots;
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);
      const isToday = formatDate(date) === formatDate(new Date());

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isDisabled && setSelectedDate(date)}
          disabled={isDisabled}
          className={cn(
            "h-12 w-12 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
            isDisabled 
              ? "text-white/30 cursor-not-allowed" 
              : "text-white hover:bg-white/10 cursor-pointer",
            isSelected && "bg-primary text-primary-foreground shadow-lg scale-105",
            isToday && !isSelected && "bg-white/20 text-white font-bold",
            !isDisabled && !isSelected && "hover:scale-105"
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-background/80 rounded-lg p-6 sm:p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">Резервирайте консултация</h2>
          </div>
          
          {calendarSettings && (
            <div className="flex items-center justify-center gap-3 mb-6">
              {calendarSettings.photo_url && (
                <img 
                  src={calendarSettings.photo_url} 
                  alt={calendarSettings.consultant_name}
                  className="w-12 h-12 object-cover rounded-full border-2 border-primary"
                />
              )}
              <div className="text-left">
                <p className="text-white font-medium">{calendarSettings.consultant_name}</p>
                <p className="text-white/70 text-sm">
                  {calendarSettings.working_hours.start} - {calendarSettings.working_hours.end}
                </p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Calendar */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <h3 className="text-xl font-semibold text-white">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* Day names */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {dayNames.map((day) => (
                      <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-white/70">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {renderCalendar()}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Изберете час за {formatDate(selectedDate)}
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {generateTimeSlots().map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "p-3 rounded-lg text-sm font-medium transition-all duration-200",
                            selectedTime === time
                              ? "bg-primary text-primary-foreground shadow-lg scale-105"
                              : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Book Button */}
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Резервирай за {formatDate(selectedDate)} в {selectedTime}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Selected appointment summary */}
                <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Вашата резервация
                  </h4>
                  <p className="text-white/80">
                    <span className="text-primary font-medium">{formatDate(selectedDate!)}</span> в <span className="text-primary font-medium">{selectedTime}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name" className="flex items-center gap-2 text-white/90">
                      <User className="h-4 w-4 text-primary/80" />
                      Име *
                    </Label>
                    <Input
                      id="client_name"
                      required
                      value={bookingData.client_name}
                      onChange={(e) => setBookingData(prev => ({ ...prev, client_name: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                      placeholder="Вашето име"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company_name" className="flex items-center gap-2 text-white/90">
                      <Building2 className="h-4 w-4 text-primary/80" />
                      Компания
                    </Label>
                    <Input
                      id="company_name"
                      value={bookingData.company_name}
                      onChange={(e) => setBookingData(prev => ({ ...prev, company_name: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                      placeholder="Вашата компания"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_email" className="flex items-center gap-2 text-white/90">
                    <Mail className="h-4 w-4 text-primary/80" />
                    Email *
                  </Label>
                  <Input
                    id="client_email"
                    type="email"
                    required
                    value={bookingData.client_email}
                    onChange={(e) => setBookingData(prev => ({ ...prev, client_email: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                    placeholder="вашият@имейл.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_phone" className="flex items-center gap-2 text-white/90">
                    <Phone className="h-4 w-4 text-primary/80" />
                    Телефон
                  </Label>
                  <div className="relative rounded-md overflow-hidden bg-white/5 border border-white/10">
                    <PhoneInput
                      country={'bg'}
                      value={bookingData.client_phone}
                      onChange={(phone) => setBookingData(prev => ({ ...prev, client_phone: phone }))}
                      inputProps={{
                        id: 'client_phone',
                      }}
                      containerClass="!w-full"
                      inputClass="!w-full !bg-transparent !border-none !text-white !py-2 !pl-12 !pr-3 !h-10"
                      buttonClass="absolute !left-0 !top-0 !bottom-0 !border-none !bg-transparent"
                      dropdownClass="!bg-background !text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-white/90">
                    <MessageSquare className="h-4 w-4 text-primary/80" />
                    Съобщение (незадължително)
                  </Label>
                  <Textarea
                    id="message"
                    value={bookingData.message}
                    onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Опишете вашия проект или запитване..."
                    className="min-h-[100px] bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-white/10 text-white hover:bg-white/10"
                  >
                    Назад към календара
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-lg px-8"
                    disabled={isSubmitting || !bookingData.client_name || !bookingData.client_email}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Резервиране...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Потвърди резервацията
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3 removed - no longer needed */}
            {false && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferred_date" className="flex items-center gap-2 text-white/90">
                      <CalendarIcon className="h-4 w-4 text-primary/80" />
                      Дата *
                    </Label>
                    <Input
                      id="preferred_date"
                      type="date"
                      required
                      min={getMinDate()}
                      value={bookingData.preferred_date}
                      onChange={(e) => setBookingData(prev => ({ ...prev, preferred_date: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferred_time" className="flex items-center gap-2 text-white/90">
                      <Clock className="h-4 w-4 text-primary/80" />
                      Час *
                    </Label>
                    <div className="relative">
                      <select
                        id="preferred_time"
                        value={bookingData.preferred_time}
                        onChange={(e) => setBookingData(prev => ({ ...prev, preferred_time: e.target.value }))}
                        className="w-full h-10 px-3 py-2 bg-white/5 border border-white/10 text-white rounded-md focus:border-primary/50 focus:ring-primary/20 focus:outline-none appearance-none"
                        required
                      >
                        <option value="" className="bg-background text-white">Изберете час</option>
                        {generateTimeSlots().map((time) => (
                          <option key={time} value={time} className="bg-background text-white">{time}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-2 text-white/90">
                    <MessageSquare className="h-4 w-4 text-primary/80" />
                    Съобщение
                  </Label>
                  <Textarea
                    id="message"
                    value={bookingData.message}
                    onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Опишете вашия проект или запитване..."
                    className="min-h-[100px] bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-white/10 text-white hover:bg-white/10"
                  >
                    Назад
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || !bookingData.preferred_date || !bookingData.preferred_time}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Резервиране...
                      </>
                    ) : (
                      "Резервирай"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};