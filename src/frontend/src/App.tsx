import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonRegistration } from './components/PersonRegistration';
import { AttendanceMarking } from './components/AttendanceMarking';
import { AttendanceRecords } from './components/AttendanceRecords';
import { Layout } from './components/Layout';
import { UserPlus, CheckSquare, FileText } from 'lucide-react';

function App() {
  return (
    <Layout>
      <div className="animate-fadeIn">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-10 h-auto p-1.5 bg-muted/50 backdrop-blur-sm border border-border/50 shadow-md">
            <TabsTrigger 
              value="register" 
              className="flex items-center gap-2.5 py-3.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-200 font-semibold text-sm data-[state=active]:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Registration</span>
              <span className="sm:hidden">Register</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mark" 
              className="flex items-center gap-2.5 py-3.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-200 font-semibold text-sm data-[state=active]:scale-[1.02]"
            >
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Mark Attendance</span>
              <span className="sm:hidden">Mark</span>
            </TabsTrigger>
            <TabsTrigger 
              value="records" 
              className="flex items-center gap-2.5 py-3.5 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all duration-200 font-semibold text-sm data-[state=active]:scale-[1.02]"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">View Records</span>
              <span className="sm:hidden">Records</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="register" className="animate-slideIn">
            <PersonRegistration />
          </TabsContent>
          
          <TabsContent value="mark" className="animate-slideIn">
            <AttendanceMarking />
          </TabsContent>
          
          <TabsContent value="records" className="animate-slideIn">
            <AttendanceRecords />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default App;
