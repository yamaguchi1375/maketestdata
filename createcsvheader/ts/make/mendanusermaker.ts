import { InterviewsEntity, MendanTarget } from "../dto/entity";
import { UserIdMaster } from "../master/useridmst";
import { FamilyMaker } from "./familymaker";
import { InterviewNoMaker } from "./idmanagement";

export class MendanMaker {
    targetDays: Array<MendanTarget>;
    interviews: Array<InterviewsEntity>;
    constructor(targetDays: Array<MendanTarget>, interviews: Array<InterviewsEntity>) {
        this.targetDays = targetDays;
        this.interviews = interviews;
    }
    make() {
        if (this.targetDays.length != this.interviews.length) {
            // TODO 一人っ子以外への対応
            throw Error('not suppport same index targetDays & interviews');
        }
        for (let i=0; i < this.interviews.length; i++) {
            let interview = this.interviews[i];
            let date = this.targetDays[i];
            let noFix = i % 4;
            if (noFix != 0) {
                interview.reservationFixDate = date.target_date;
                interview.firstChoiceDate = date.target_date;
                interview.permitFlag = 2;
                interview.status = 1;
                interview.interviewDate = 'NULL';
            } else {
                interview.reservationFixDate = 'NULL';
                interview.reservationFixTimeFrom = 'NULL';
                interview.reservationFixTimeTo = 'NULL';
                interview.firstChoiceDate = date.target_date;
                interview.permitFlag = 2;
                interview.status = 0;
                interview.interviewDate = 'NULL';
            } 
        }
    }
}