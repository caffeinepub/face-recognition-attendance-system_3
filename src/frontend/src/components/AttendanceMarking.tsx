import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePersonStorage } from '../hooks/usePersonStorage';
import { useAttendance } from '../hooks/useAttendance';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, UserCheck, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export function AttendanceMarking() {
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { persons, isLoading: isLoadingPersons } = usePersonStorage();
  const { markAttendance, isMarking } = useAttendance();

  const handleMarkAttendance = async () => {
    if (!selectedPersonId) return;

    const person = persons.find((p) => p.id === selectedPersonId);
    if (!person) return;

    const success = await markAttendance(person.id, person.name, true);
    
    if (success) {
      setShowSuccess(true);
      setSelectedPersonId('');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  if (isLoadingPersons) {
    return (
      <Card className="max-w-5xl mx-auto border-border/60 shadow-xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="border-b border-border/40">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-96 mt-3" />
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-56 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (persons.length === 0) {
    return (
      <Card className="max-w-5xl mx-auto border-border/60 shadow-xl bg-card/95 backdrop-blur-sm animate-scaleIn">
        <CardHeader className="border-b border-border/40">
          <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3 font-bold">
            <div className="p-2 bg-primary/10 rounded-xl">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
            Mark Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <Alert className="border-muted-foreground/20">
            <Users className="h-5 w-5" />
            <AlertDescription className="text-base font-medium">
              No persons registered yet. Please register persons first before marking attendance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-5xl mx-auto border-border/60 shadow-xl bg-card/95 backdrop-blur-sm animate-scaleIn">
      <CardHeader className="space-y-2 pb-6 border-b border-border/40">
        <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3 font-bold">
          <div className="p-2 bg-primary/10 rounded-xl">
            <UserCheck className="w-6 h-6 text-primary" />
          </div>
          Mark Attendance
        </CardTitle>
        <CardDescription className="text-base">
          Select a person from the list below to mark their attendance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-8">
        <ScrollArea className="h-[520px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {persons.map((person) => (
              <button
                key={person.id}
                onClick={() => setSelectedPersonId(person.id)}
                className={`relative group overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                  selectedPersonId === person.id
                    ? 'border-primary shadow-xl shadow-primary/25 scale-[1.03] ring-2 ring-primary/20'
                    : 'border-border/60 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]'
                }`}
              >
                <div className="aspect-square bg-muted">
                  <img
                    src={person.faceImageUrl}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-card border-t border-border/40">
                  <p className="font-semibold text-base truncate">{person.name}</p>
                </div>
                {selectedPersonId === person.id && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg animate-scaleIn">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        {showSuccess && (
          <Alert className="bg-success/10 border-success/30 animate-slideIn">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <AlertDescription className="text-success-foreground font-medium text-base">
              Attendance marked successfully!
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleMarkAttendance}
          disabled={!selectedPersonId || isMarking}
          className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isMarking ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Marking Attendance...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Mark Attendance
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
