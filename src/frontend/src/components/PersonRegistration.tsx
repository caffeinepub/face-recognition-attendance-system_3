import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { WebcamCapture } from './WebcamCapture';
import { usePersonStorage } from '../hooks/usePersonStorage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, UserPlus, AlertCircle } from 'lucide-react';

export function PersonRegistration() {
  const [name, setName] = useState('');
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [nameError, setNameError] = useState('');

  const { addPerson, isAdding } = usePersonStorage();

  const handleCapture = (file: File) => {
    setCapturedFile(file);
    const url = URL.createObjectURL(file);
    setCapturedImageUrl(url);
  };

  const handleRetake = () => {
    if (capturedImageUrl) {
      URL.revokeObjectURL(capturedImageUrl);
    }
    setCapturedFile(null);
    setCapturedImageUrl('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError && value.trim()) {
      setNameError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setNameError('Please enter a name');
      return;
    }

    if (!capturedFile) {
      return;
    }

    const success = await addPerson(name.trim(), capturedFile);
    
    if (success) {
      setShowSuccess(true);
      setName('');
      setNameError('');
      handleRetake();
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const isFormValid = name.trim() && capturedFile;

  return (
    <Card className="max-w-2xl mx-auto border-border/60 shadow-xl bg-card/95 backdrop-blur-sm animate-scaleIn">
      <CardHeader className="space-y-2 pb-6 border-b border-border/40">
        <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3 font-bold">
          <div className="p-2 bg-primary/10 rounded-xl">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          Register New Person
        </CardTitle>
        <CardDescription className="text-base">
          Enter the person's name and capture their face photo to register them in the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-semibold flex items-center gap-1.5">
              Full Name
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={handleNameChange}
              className={`h-12 text-base transition-all duration-200 ${
                nameError ? 'border-destructive focus-visible:ring-destructive/20' : ''
              }`}
              required
            />
            {nameError && (
              <div className="flex items-center gap-2 text-sm text-destructive animate-slideIn">
                <AlertCircle className="w-4 h-4" />
                <span>{nameError}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-1.5">
              Face Photo
              <span className="text-destructive">*</span>
            </Label>
            <WebcamCapture
              onCapture={handleCapture}
              capturedImage={capturedImageUrl}
              onRetake={handleRetake}
            />
          </div>

          {showSuccess && (
            <Alert className="bg-success/10 border-success/30 animate-slideIn">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <AlertDescription className="text-success-foreground font-medium text-base">
                Person registered successfully!
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!isFormValid || isAdding}
            className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Register Person
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
