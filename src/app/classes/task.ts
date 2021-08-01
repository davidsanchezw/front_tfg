import { ScheduleTime } from "./schedule-time";

export class Task {
    id: number;
    typeIdentity: number;
    typeTask: number;
    title: string;
    statement: string;
    reviews: number;
    answers: number;
    scheduleTime: ScheduleTime;
}
