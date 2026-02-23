import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface AttendanceRecord {
    status: boolean;
    personName: string;
    personId: string;
    timestamp: Time;
}
export interface backendInterface {
    addRecord(personId: string, personName: string, status: boolean): Promise<void>;
    getAllRecords(): Promise<Array<AttendanceRecord>>;
    getRecordsByDate(startTime: Time, endTime: Time): Promise<Array<AttendanceRecord>>;
}
