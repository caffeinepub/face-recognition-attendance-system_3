import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AttendanceRecord } from '../backend';

export function useGetAllRecords() {
  const { actor, isFetching } = useActor();

  return useQuery<AttendanceRecord[]>({
    queryKey: ['attendance-records'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRecordsByDate(startTime: bigint, endTime: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<AttendanceRecord[]>({
    queryKey: ['attendance-records', startTime.toString(), endTime.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecordsByDate(startTime, endTime);
    },
    enabled: !!actor && !isFetching,
  });
}
