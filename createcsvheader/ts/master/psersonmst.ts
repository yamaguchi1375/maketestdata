import {readCsv, Converter} from '../util/fileIO'
import {Person} from '../dto/dtos'

const Relationship = {
    HONNIN: `本人`,
    CHICHI: `父`,
    HAHA: `母`,
    SOHU: `祖父`,
    SOBO: `祖母`,
    GIHU: `義父`,
    GIBO: `義母`,
    MUSUKO: `息子`,
    MUSUME: `娘`
};

const Gender = {
    MALE: "男",
    WOMAN: "女"
}

function GenderValue(strValue: string): number {
    return strValue == Gender.MALE ? 1 : 2;
}

const PersonCsvMapping = {
    name: `名前`,
    kana: `ふりがな`,
    gender: `性別`,
    age: `年齢`,
    birthday: `誕生日`,
    bloodType: `血液型`,
    cellPhoneNumber: `携帯`
};
  
const convertPersonMst: Converter<Person> = (record, index) => {
    return {
        name: record[PersonCsvMapping.name],
        kana: record[PersonCsvMapping.kana].replace(/[ぁ-ん]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
         }),
        lastName: record[PersonCsvMapping.name].split(` `)[0],
        firstName: record[PersonCsvMapping.name].split(` `)[1],
        lastKana: record[PersonCsvMapping.kana].replace(/[ぁ-ん]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
         }).split(` `)[0],
        firstKana: record[PersonCsvMapping.kana].replace(/[ぁ-ん]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
         }).split(` `)[1],
        gender: GenderValue(record[PersonCsvMapping.gender]),
        age: record[PersonCsvMapping.age],
        birthday: record[PersonCsvMapping.birthday],
        bloodType: record[PersonCsvMapping.bloodType],
        cellPhoneNumber: record[PersonCsvMapping.cellPhoneNumber],
        relationship: Relationship.HONNIN,
        index: index
    };
};

export class PersonMaster {
    otonas: Array<Person> = [];
    kodomos: Array<Person> = [];
    constructor() {
    }
    async setup(otonapath: string, kodomopath: string) {
        const otonaresult = await readCsv(otonapath, convertPersonMst);
        this.otonas.splice(this.otonas.length, 0, ...otonaresult);
        const kodomoresult = await readCsv(kodomopath, convertPersonMst);
        this.kodomos.splice(this.kodomos.length, 0, ...kodomoresult);
    }
    getRandomOtona() {
        return this.otonas[Math.floor(Math.random() * (this.otonas.length - 1))];
    }
    getRandomKodomo() {
        return this.kodomos[Math.floor(Math.random() * (this.kodomos.length - 1))];
    }
    makeRandomFamilyOtona(base: Person): Person {
        const family = this.getRandomOtona();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            gender: family.gender,
            age: family.age,
            birthday: family.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: family.cellPhoneNumber,
            relationship: family.gender == GenderValue(Gender.MALE) ? Relationship.CHICHI : Relationship.HAHA,
            index: family.index
        };
    }
    makeRandomFamilySohuSobo(base: Person): Person {
        const family = this.getRandomOtona();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            gender: family.gender,
            age: family.age,
            birthday: family.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: family.cellPhoneNumber,
            relationship: family.gender == GenderValue(Gender.MALE) ? Relationship.SOHU : Relationship.SOBO,
            index: family.index
        };
    }
    makeRandomFamilyKodomo(base: Person): Person {
        const family = this.getRandomKodomo();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            gender: family.gender,
            age: family.age,
            birthday: family.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: family.cellPhoneNumber,
            relationship: family.gender == GenderValue(Gender.MALE) ? Relationship.MUSUKO : Relationship.MUSUME,
            index: family.index
        };
    }
    makeRandomFamilyTataiji(base: Person): Person {
        const family = this.getRandomKodomo();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            gender: family.gender,
            age: base.age,
            birthday: base.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: base.cellPhoneNumber,
            relationship: base.relationship,
            index: family.index
        };
    }
}
