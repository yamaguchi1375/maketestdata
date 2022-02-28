import { UserId } from "../dto/dtos";

/* @deprecated */
export class UserIdMaker {
    index: number;
    userids: Array<UserId>;
    constructor(userids: Array<UserId>) {
        this.userids = userids;
        this.index = 0;
    }
    createNewUserId(): UserId {
        return this.userids[this.index++];
    } 
}

export class MailAdressMaker {
    prefix: string;
    suffix: string;
    startIndex: number;
    constructor(prefix: string, suffix: string, startIndex: number) {
        this.prefix = prefix;
        this.suffix = suffix;
        this.startIndex = startIndex;
    }
    createNewId(): string {
        return this.prefix + `+` + new String(this.startIndex++) + `@` + this.suffix;
    }
}

export class InterviewNoMaker {
    startIndex: number;
    constructor(startIndex: number) {
        this.startIndex = startIndex;
    }
    createNewNo(): number {
        return this.startIndex++;
    };
}
