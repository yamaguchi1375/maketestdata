import { MendanTarget } from "../dto/entity";
import { Converter, readCsv } from "../util/fileIO";

const converter: Converter<MendanTarget> = (record, index) => {
    return {
        target_date: record['target_date']
    };    
}

export class MendanTargetMaster {
    targets: Array<MendanTarget>;
    constructor() {
        this.targets = new Array<MendanTarget>();        
    };
   async setup(path: string) {
        const result = await readCsv(path, converter);
        this.targets.splice(this.targets.length, 0, ...result);
    };
    getTargetsDate() {
        return this.targets;
    }
}