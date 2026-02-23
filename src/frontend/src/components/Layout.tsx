import { ReactNode } from 'react';
import { UserCircle2, Heart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100 dark:from-slate-950 dark:via-teal-950/20 dark:to-slate-900">
      <header className="border-b border-border/60 bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-gradient-to-br from-primary to-teal-600 rounded-2xl shadow-lg shadow-primary/25 transition-transform duration-200 hover:scale-105">
              <UserCircle2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-teal-600 dark:from-primary dark:to-teal-400 bg-clip-text text-transparent tracking-tight">
                Face Recognition Attendance
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
                Secure and efficient attendance management system
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>

      <footer className="border-t border-border/60 bg-card/80 backdrop-blur-md mt-auto shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p className="font-medium">© {currentYear} Face Recognition Attendance System. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with{' '}
              <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200 hover:underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
