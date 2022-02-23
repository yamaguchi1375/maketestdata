export class UserIdMaker {
    createNewId(): string {
        const { v4: uuidv4 } = require('uuid');
        return uuidv4();
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

export class ChildIdMaker {
    prefix: string;
    startIndex: number;
    constructor(prefix: string, startIndex: number) {
        this.prefix = prefix;
        this.startIndex = startIndex;
    }
    createNewId(): string {
        return this.prefix + new String(this.startIndex++);
    };
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
