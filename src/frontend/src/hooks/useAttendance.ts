import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useGetAllRecords, useGetRecordsByDate } from './useQueries';
import type { AttendanceRecord } from '../backend';
import { startOfDay, endOfDay } from 'date-fns';

export function useAttendance(filterDate?: Date) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const startTime = filterDate ? BigInt(startOfDay(filterDate).getTime() * 1_000_000) : undefined;
  const endTime = filterDate ? BigInt(endOfDay(filterDate).getTime() * 1_000_000) : undefined;

  const allRecordsQuery = useGetAllRecords();
  const filteredRecordsQuery = useGetRecordsByDate(
    startTime || BigInt(0),
    endTime || BigInt(0)
  );

  const recordsQuery = filterDate ? filteredRecordsQuery : allRecordsQuery;

  const markAttendanceMutation = useMutation({
    mutationFn: async ({
      personId,
      personName,
      status,
    }: {
      personId: string;
      personName: string;
      status: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addRecord(personId, personName, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance-records'] });
    },
  });

  const markAttendance = async (
    personId: string,
    personName: string,
    status: boolean
  ): Promise<boolean> => {
    try {
      await markAttendanceMutation.mutateAsync({ personId, personName, status });
      return true;
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      return false;
    }
  };

  const sortedRecords = [...(recordsQuery.data || [])].sort((a, b) => {
    return Number(b.timestamp - a.timestamp);
  });

  return {
    records: sortedRecords,
    isLoading: recordsQuery.isLoading,
    isMarking: markAttendanceMutation.isPending,
    markAttendance,
    refetch: recordsQuery.refetch,
  };
}
