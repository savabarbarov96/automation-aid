
import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { loginWithEmail } from "@/lib/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Effect to redirect after login is confirmed
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/blog-admin');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await loginWithEmail(email, password);
      
      if (error) {
        throw error;
      }

      toast({
        title: "Успешно влизане",
        description: "Добре дошли в админ панела на блога!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Грешка при влизане",
        description: error.message || "Невалидни данни за влизане.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // If already authenticated and not in loading state, this will trigger the useEffect above
  if (user && !authLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Влезте в админ панела</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Имейл</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="вашият@имейл.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Парола</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Влизане..." : "Вход"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
