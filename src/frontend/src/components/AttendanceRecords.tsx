import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAttendance } from '../hooks/useAttendance';
import { Calendar, FileText, RefreshCw, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

export function AttendanceRecords() {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const { records, isLoading, refetch } = useAttendance(dateFilter);

  const handleClearFilter = () => {
    setDateFilter(undefined);
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return {
      date: format(date, 'MMM dd, yyyy'),
      time: format(date, 'hh:mm a'),
    };
  };

  return (
    <Card className="max-w-6xl mx-auto border-border/60 shadow-xl bg-card/95 backdrop-blur-sm animate-scaleIn">
      <CardHeader className="space-y-2 pb-6 border-b border-border/40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3 font-bold">
              <div className="p-2 bg-primary/10 rounded-xl">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              Attendance Records
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              View and filter attendance records by date.
            </CardDescription>
          </div>
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="icon"
            disabled={isLoading}
            className="h-10 w-10 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-2.5 h-10 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                {dateFilter ? format(dateFilter, 'PPP') : 'Select Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {dateFilter && (
            <Button
              onClick={handleClearFilter}
              variant="outline"
              className="gap-2 h-10 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <X className="w-4 h-4" />
              Clear Filter
            </Button>
          )}

          <div className="ml-auto flex items-center gap-2.5 text-sm text-muted-foreground font-medium bg-muted/50 px-4 py-2 rounded-lg border border-border/40">
            <span className="font-bold text-foreground text-base">{records.length}</span>
            <span>record{records.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="inline-flex p-4 bg-muted/50 rounded-2xl mb-4">
              <FileText className="w-12 h-12 opacity-50" />
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">No records found</p>
            <p className="text-base">
              {dateFilter
                ? 'No attendance records for the selected date.'
                : 'No attendance records available yet.'}
            </p>
          </div>
        ) : (
          <div className="border border-border/60 rounded-xl overflow-hidden shadow-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border/60">
                  <TableHead className="font-bold text-foreground text-sm h-12">Name</TableHead>
                  <TableHead className="font-bold text-foreground text-sm h-12">Date</TableHead>
                  <TableHead className="font-bold text-foreground text-sm h-12">Time</TableHead>
                  <TableHead className="font-bold text-foreground text-sm h-12">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record, index) => {
                  const { date, time } = formatTimestamp(record.timestamp);
                  return (
                    <TableRow 
                      key={`${record.personId}-${record.timestamp}-${index}`}
                      className="transition-colors duration-150 hover:bg-muted/30 border-b border-border/40 last:border-0"
                    >
                      <TableCell className="font-semibold text-base py-4">{record.personName}</TableCell>
                      <TableCell className="text-muted-foreground font-medium py-4">
                        {date}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium py-4">
                        {time}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant={record.status ? 'default' : 'destructive'}
                          className={`font-semibold shadow-sm ${
                            record.status
                              ? 'bg-success/15 text-success hover:bg-success/20 border-success/30'
                              : ''
                          }`}
                        >
                          {record.status ? 'Present' : 'Absent'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
