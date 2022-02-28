import {readCsv, Converter} from '../util/fileIO'
import {Jyusyo} from '../dto/dtos'

const JyusyoCsvMapping = {
    yubin7: `YUBIN_7`,
    jyusyo: `JYUSYO`,
    jyusyo2: `JYUSYO2`
};
  
const convertJyusyoMst: Converter<Jyusyo> = (record, index) => {
    return {
        yubin7: record[JyusyoCsvMapping.yubin7],
        jyusyo: record[JyusyoCsvMapping.jyusyo],
        jyusyo2: record[JyusyoCsvMapping.jyusyo2],
        index
    };
};

export class JyusyoMaster {
    jyusyos: Array<Jyusyo> = [];
    constructor() {
    }
    async setup(path: string) {
        const result = await readCsv(path, convertJyusyoMst);
        this.jyusyos.splice(this.jyusyos.length, 0, ...result);
    }
    getRandomJyusyo() {
        // return this.jyusyos[Math.floor(Math.random() * (this.jyusyos.length - 1))];
        return {
            yubin7: `231-0005`,
            jyusyo: `神奈川県横浜市中区本町`,
            jyusyo2: `６丁目５０−１０`,
            index: 1
        }
    }
}
