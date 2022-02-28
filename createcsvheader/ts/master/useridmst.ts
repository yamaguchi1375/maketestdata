import { UserId } from "../dto/dtos";
import { readJson } from "../util/fileIO";

export class UserIdMaster {
    index: number;
    facility_id: string;
    userids: Array<UserId> = [];
    constructor(facility_id: string, startIndex: number) {
        this.facility_id = facility_id;
        this.index = startIndex;
    }
    async setup(path: string) {
        const result = await readJson<UserId>(path);
        let facilityUsers = result.filter(r => r.facility_id == this.facility_id);
        this.userids.splice(this.userids.length, 0, ...facilityUsers);
    }
    getNewUserId(): UserId {
        return this.userids[this.index++];
    }
}
