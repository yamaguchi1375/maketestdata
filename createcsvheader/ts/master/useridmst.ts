import { UserId } from "../dto/dtos";
import { readJson } from "../util/fileIO";

export class UserIdMaster {
    index: number;
    userids: Array<UserId> = [];
    constructor(startIndex: number) {
        this.index = startIndex;
    }
    async setup(path: string) {
        const result = await readJson<UserId>(path);
        this.userids.splice(this.userids.length, 0, ...result);
    }
    getNewUserId(): UserId {
        return this.userids[this.index++];
    }
}
