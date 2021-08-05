import { ResponseAnswer } from "./response-answer";

export class ResponseStatement {
    id: number;
    lastTime: Date;
    statement: string;
    responseAnswer: ResponseAnswer[];
}
