import {JyusyoMaster} from '../master/jyusyomst';
import {PersonMaster} from '../master/psersonmst';
import {Users, Children, Interviews, Person, Family} from '../dto/dtos';
import {InterviewNoMaker, MailAdressMaker} from '../make/idmanagement';
import {DateUtil} from '../util/datetimeutil';
import { basicChildrenDetailEntity, basicChildrenEntity, basicInterviewsEntity, basicUserEntity, ChildrenDetailEntity, ChildrenEntity } from '../dto/entity';

export const FamilyPattern = {
    Children1: {title: `子供 1`, parent: `both`, children: 1, futago: 0, mitsugo: 0},
    Children2: {title: `子供 2`, parent: `both`, children: 2, futago: 0, mitsugo: 0},
    Children3: {title: `子供 3`, parent: `both`, children: 3, futago: 0, mitsugo: 0},
    Futago2: {title: `双子`, parent: `both`, children: 0, futago: 1, mitsugo: 0},
    Futago3: {title: `双子 + 1`, parent: `both`, children: 1, futago: 1, mitsugo: 0},
    Mitsugo3: {title: `三子`, parent: `both`, children: 0, futago: 0, mitsugo: 1},
    Mitsugo4: {title: `三子 + 1`, parent: `both`, children: 1, futago: 1, mitsugo: 1},
    SingleParent1: {title: `両親 1 子供 1`, parent: `single`, children: 1, futago: 0, mitsugo: 0},
    SingleParent2: {title: `両親 1 子供 2`, parent: `single`, children: 2, futago: 0, mitsugo: 0},
} as const;
export type FamilyPattern = typeof FamilyPattern[keyof typeof FamilyPattern]; 

const STAGING_FACILITY_USER_ID = 'afb530ae-a1e7-477c-aab5-9a779603e2d6';
const DATE_CRAETE_PRC_DATE = '2022-02-22 10:07:31.996';

export class FamilyMaker {
    index: number;
    pattern: FamilyPattern;
    userId: string;
    facilityId: string;
    jyusyoMaster: JyusyoMaster;
    personMaster: PersonMaster;
    interviewNoMaker: InterviewNoMaker;
    mailAdress: string;
    user: Users;
    childrens: Array<Children>;
    childrenDetails: Array<ChildrenDetailEntity>;
    interviews: Array<Interviews>;
    multipleBirthsHouseholdFlag: number;
    constructor(index: number, pattern: FamilyPattern, userId: string, facilityId: string
        , interviewNoMaker: InterviewNoMaker, mailAdress: string
        , jyusyoMaster: JyusyoMaster, personMaster: PersonMaster) {
        this.index = index;
        this.pattern = pattern;
        this.userId = userId;
        this.facilityId = facilityId;
        this.interviewNoMaker = interviewNoMaker;
        this.mailAdress = mailAdress;
        this.jyusyoMaster = jyusyoMaster;
        this.personMaster = personMaster;
        this.childrens = [];
        this.childrenDetails = [];
        this.interviews = [];
        this.user = this.makeUser();
        switch (this.pattern) {
            case FamilyPattern.Children1:
            case FamilyPattern.Children2:
            case FamilyPattern.Children3:
            case FamilyPattern.Futago2:
            case FamilyPattern.Futago3:
            case FamilyPattern.Mitsugo3:
            case FamilyPattern.Mitsugo4:
                 this.multipleBirthsHouseholdFlag = 1;
                break;
            default:
                this.multipleBirthsHouseholdFlag = 0;
        }
    }

    make(): Family {
        this.makeChildren();
        this.makeChildrenDetail();
        this.makeInterview();
        return {
            user: this.user,
            childrens: this.childrens,
            childrendetails: this.childrenDetails,
            interviews: this.interviews
        };
    }

    getUser(): Users {
        return this.user;
    }
    
    getChildrens(): Array<Children> {
        return this.childrens;
    }
    
    getChildInterviews(): Array<Interviews> {
        return this.interviews;
    }
    
    private makeUser(): Users {
        const person = this.personMaster.getRandomOtona();
        const jyusyo = this.jyusyoMaster.getRandomJyusyo();
        const emergencyPerson = this.personMaster.makeRandomFamilySohuSobo(person);
        let basic = { ...basicUserEntity };
        return {
            person: person,
            userId: this.userId,
            name: person.name,
            kana: person.kana,
            tel: person.cellPhoneNumber,
            email: this.mailAdress,
            postalCode: jyusyo.yubin7,
            address1: jyusyo.jyusyo,
            address2: jyusyo.jyusyo2,
            buildingNameRoomNumber: basic.buildingNameRoomNumber,
            relationship: basic.relationship,
            emergencyContactName1: emergencyPerson.name,
            emergencyContactKana1: emergencyPerson.kana,
            emergencyContactRelationship1: emergencyPerson.relationship,
            emergencyContactCompany1: basic.emergencyContactCompany1,
            emergencyContactTel1: emergencyPerson.cellPhoneNumber,
            emergencyContactEmail1: basic.emergencyContactEmail1,
            emergencyContactName2: basic.emergencyContactName2,
            emergencyContactKana2: basic.emergencyContactKana2,
            emergencyContactRelationship2: basic.emergencyContactRelationship2,
            emergencyContactCompany2: basic.emergencyContactCompany2,
            emergencyContactTel2: basic.emergencyContactTel2,
            emergencyContactEmail2: basic.emergencyContactEmail2,
            emergencyContactName3: basic.emergencyContactName3,
            emergencyContactKana3: basic.emergencyContactKana3,
            emergencyContactRelationship3: basic.emergencyContactRelationship3,
            emergencyContactCompany3: basic.emergencyContactCompany3,
            emergencyContactTel3: basic.emergencyContactTel3,
            emergencyContactEmail3: basic.emergencyContactEmail3,
            welfareHouseholdFlag: basic.welfareHouseholdFlag,
            taxExemptHouseholdFlag: basic.taxExemptHouseholdFlag,
            singleParentHouseholdFlag: basic.singleParentHouseholdFlag,
            multipleBirthsHouseholdFlag: this.multipleBirthsHouseholdFlag,
            deleteFlag: basic.deleteFlag,
            createUser: STAGING_FACILITY_USER_ID,
            createDatetime: DATE_CRAETE_PRC_DATE,
            updateUser: STAGING_FACILITY_USER_ID,
            updateDatetime: DATE_CRAETE_PRC_DATE
    };
    }

    private makeChildren() {
        switch (this.pattern) {
            case FamilyPattern.Children1:
                this.bothChildren1();
                break;
            case FamilyPattern.Children2:
                this.bothChildren2();
                break;
            case FamilyPattern.Children3:
                this.bothChildren3();
                break;
            case FamilyPattern.Futago2:
                this.bothFutago2();
                break;
            case FamilyPattern.Futago3:
                this.bothFutago3();
                break;
            case FamilyPattern.Mitsugo3:
                this.bothMitsugo3();
                break;
            case FamilyPattern.Mitsugo4:
                this.bothMitsugo4();
                break;
            default:
            throw new Error(`not supoort FamilyPatter!! pattern: ` + this.pattern);
        }
    }

    private makeChildrenDetail() {
        let basic = { ...basicChildrenDetailEntity };
        this.childrens.forEach(child => {
            const detail: ChildrenDetailEntity = {
                childId: child.childId,
                userId: child.userId,
                facilityId: this.facilityId,
                facilityChildNumber: basicChildrenDetailEntity.facilityChildNumber,
                regularUseFlag: basicChildrenDetailEntity.regularUseFlag,
                singleUseFlag: basicChildrenDetailEntity.singleUseFlag,
                limitOverApprovalFlag: basicChildrenDetailEntity.limitOverApprovalFlag,
                birthHeight: basicChildrenDetailEntity.birthHeight,
                birthWeight: basicChildrenDetailEntity.birthWeight,
                normalTemperature: basicChildrenDetailEntity.normalTemperature,
                medicalHistoryContent: basicChildrenDetailEntity.medicalHistoryContent,
                healthPhysicalDevelopmentConcerns: basicChildrenDetailEntity.healthPhysicalDevelopmentConcerns,
                familyHospital: basicChildrenDetailEntity.familyHospital,
                familyHospitalTel: basicChildrenDetailEntity.familyHospitalTel,
                bedTime: basicChildrenDetailEntity.bedTime,
                wakeupTime: basicChildrenDetailEntity.wakeupTime,
                napTime: basicChildrenDetailEntity.napTime,
                napStartTime: basicChildrenDetailEntity.napStartTime,
                napEndTime: basicChildrenDetailEntity.napEndTime,
                putToSleep: basicChildrenDetailEntity.putToSleep,
                fallAsleep: basicChildrenDetailEntity.fallAsleep,
                excretion: basicChildrenDetailEntity.excretion,
                leaveChildFlag: basicChildrenDetailEntity.leaveChildFlag,
                leaveChildTo: basicChildrenDetailEntity.leaveChildTo,
                note: basicChildrenDetailEntity.note,
                createUser: child.createUser,
                createDatetime: child.createDatetime,
                updateUser: child.updateUser,
                updateDatetime: child.updateDatetime
            };
            this.childrenDetails.push(detail);
        });
    }

    private makeInterview() {
        let basicInterview = { ...basicInterviewsEntity};
        this.childrens.forEach(child => {
            const reserveDate = DateUtil.getRandomChoiceDate(child.birthday);
            const reserveTime = DateUtil.getRandomChoiceTime();
            const reserveETime = DateUtil.getEndReservDatetime(reserveTime);
            const interview: Interviews = {
                title: new String(this.index) + ` - ` + this.pattern.title,
                interviewNo: ``,
                facilityId: this.facilityId,
                firstChoiceDate: reserveDate,
                firstChoiceTimeFrom: reserveTime,
                firstChoiceTimeTo: reserveETime,
                secondChoiceDate: basicInterview.secondChoiceDate,
                secondChoiceTimeFrom: basicInterview.secondChoiceTimeFrom,
                secondChoiceTimeTo: basicInterview.secondChoiceTimeTo,
                thirdChoiceDate: basicInterview.thirdChoiceDate,
                thirdChoiceTimeFrom: basicInterview.thirdChoiceTimeFrom,
                thirdChoiceTimeTo: basicInterview.thirdChoiceTimeTo,
                reservationFixDate: reserveDate,
                reservationFixTimeFrom: reserveTime,
                reservationFixTimeTo: reserveETime,
                reservationMethod: basicInterview.reservationMethod,
                reservationDatetime: basicInterview.reservationDatetime,
                status: basicInterview.status,
                parentName: this.user.name,
                parentKana: this.user.kana,
                postalCode: this.user.postalCode,
                address1: this.user.address1,
                address2: this.user.address2,
                buildingNameRoomNumber: basicInterview.buildingNameRoomNumber,
                tel: this.user.tel,
                email: this.user.email,
                relationship: basicInterview.relationship,
                emergencyContactName1: this.user.emergencyContactName1,
                emergencyContactKana1: this.user.emergencyContactKana1,
                emergencyContactRelationship1: this.user.emergencyContactRelationship1,
                emergencyContactCompany1: basicInterview.emergencyContactCompany1,
                emergencyContactTel1: basicInterview.emergencyContactTel1,
                emergencyContactEmail1: basicInterview.emergencyContactEmail1,
                emergencyContactName2: basicInterview.emergencyContactName2,
                emergencyContactKana2: basicInterview.emergencyContactKana2,
                emergencyContactRelationship2: basicInterview.emergencyContactRelationship2,
                emergencyContactCompany2: basicInterview.emergencyContactCompany2,
                emergencyContactTel2: basicInterview.emergencyContactTel2,
                emergencyContactEmail2: basicInterview.emergencyContactEmail2,
                emergencyContactName3: basicInterview.emergencyContactName3,
                emergencyContactKana3: basicInterview.emergencyContactKana3,
                emergencyContactRelationship3: basicInterview.emergencyContactRelationship3,
                emergencyContactCompany3: basicInterview.emergencyContactCompany3,
                emergencyContactTel3: basicInterview.emergencyContactTel3,
                emergencyContactEmail3: basicInterview.emergencyContactEmail3,
                welfareHouseholdFlag: basicInterview.welfareHouseholdFlag,
                taxExemptHouseholdFlag: basicInterview.taxExemptHouseholdFlag,
                singleParentHouseholdFlag: basicInterview.singleParentHouseholdFlag,
                multipleBirthsHouseholdFlag: child.multipleBirthsFlag,
                limitApprovalFlag: basicInterview.limitApprovalFlag,
                childcareBusinessUserFlag: basicInterview.childcareBusinessUserFlag,
                noChildcareProvidedFlag: basicInterview.noChildcareProvidedFlag,
                limitOverApprovalFlag: basicInterview.limitOverApprovalFlag,
                regularUseFlag: basicInterview.regularUseFlag,
                singleUseFlag: basicInterview.singleUseFlag,
                childName: child.name,
                childKana: child.kana,
                childBirth: child.birthday,
                registAge: child.registAge,
                childGender: child.gender,
                bloodType: child.bloodType,
                childMedicalHistoryFlag: basicInterview.childMedicalHistoryFlag,
                childAllergyFlag: child.allergyFlag,
                citizenChildAllergy: basicInterview.citizenChildAllergy,
                allergyCauses1: child.allergyCauses1,
                allergySymptoms1: child.allergySymptoms1,
                allergyTreatments1: child.allergyTreatments1,
                allergyConcerns1: child.allergyConcerns1,
                allergyCauses2: child.allergyCauses2,
                allergySymptoms2: child.allergySymptoms2,
                allergyTreatments2: child.allergyTreatments2,
                allergyConcerns2: child.allergyConcerns2,
                allergyCauses3: child.allergyCauses3,
                allergySymptoms3: child.allergySymptoms3,
                allergyTreatments3: child.allergyTreatments3,
                allergyConcerns3: child.allergyConcerns3,
                brothersSistersFlag: basicInterview.brothersSistersFlag,
                multipleBirthsFlag: basicInterview.multipleBirthsFlag,
                disabilities: basicInterview.disabilities,
                note: basicInterview.note,
                interviewDate: reserveDate,
                permitFlag: basicInterview.permitFlag,
                reason: basicInterview.reason,
                facilityNumber: basicInterview.facilityNumber,
                birthHeight: basicInterview.birthHeight,
                birthWeight: basicInterview.birthWeight,
                normalTemperature: basicInterview.normalTemperature,
                medicalHistoryContent: basicInterview.medicalHistoryContent,
                healthPhysicalDevelopmentConcerns: basicInterview.healthPhysicalDevelopmentConcerns,
                familyHospital: basicInterview.familyHospital,
                familyHospitalTel: basicInterview.familyHospitalTel,
                bedTime: basicInterview.bedTime,
                wakeupTime: basicInterview.wakeupTime,
                napTime: basicInterview.napTime,
                napStartTime: basicInterview.napStartTime,
                napEndTime: basicInterview.napEndTime,
                putToSleep: basicInterview.putToSleep,
                fallAsleep: basicInterview.fallAsleep,
                excretion: basicInterview.excretion,
                leaveChildFlag: basicInterview.leaveChildFlag,
                leaveChildTo: basicInterview.leaveChildTo,
                userId: this.user.userId,
                childId: child.childId,
                createUser: STAGING_FACILITY_USER_ID,
                createDatetime: DATE_CRAETE_PRC_DATE,
                updateUser: STAGING_FACILITY_USER_ID,
                updateDatetime: DATE_CRAETE_PRC_DATE
            };
            this.interviews.push(interview);
        });
    }

    private convertPersonToChildren(child: Person): Children {
        let basic: ChildrenEntity = { ...basicChildrenEntity};
        return  {
            person: child,
            childId: new String(this.childrens.length + 1).padStart(2, '0'),
            userId: this.user.userId,
            name: child.name,
            kana: child.kana,
            birthday: child.birthday,
            registAge: child.age,
            gender: child.gender,
            bloodType: child.bloodType,
            allergyFlag: basic.allergyFlag,
            allergyCauses1: basic.allergyCauses1,
            allergySymptoms1:  basic.allergySymptoms1,
            allergyTreatments1:  basic.allergyTreatments1,
            allergyConcerns1:  basic.allergyConcerns1,
            allergyCauses2: basic.allergyCauses2,
            allergySymptoms2: basic.allergySymptoms2,
            allergyTreatments2: basic.allergyTreatments2,
            allergyConcerns2: basic.allergyConcerns2,
            allergyCauses3: basic.allergyCauses3,
            allergySymptoms3: basic.allergySymptoms3,
            allergyTreatments3: basic.allergyTreatments3,
            allergyConcerns3: basic.allergyConcerns3,
            brothersSistersFlag: basic.brothersSistersFlag,
            multipleBirthsFlag: basic.multipleBirthsFlag,
            disabilities: basic.disabilities,
            childcareBusinessUserFlag: basic.childcareBusinessUserFlag,
            noChildcareProvidedFlag: basic.noChildcareProvidedFlag,
            limitApprovalFlag: basic.limitApprovalFlag,
            deleteFlag: basic.deleteFlag,
            createUser: STAGING_FACILITY_USER_ID,
            createDatetime: DATE_CRAETE_PRC_DATE,
            updateUser: STAGING_FACILITY_USER_ID,
            updateDatetime: DATE_CRAETE_PRC_DATE
    };
    }

    private bothChildren1() {
        const child = this.personMaster.makeRandomFamilyKodomo(this.user.person);
        this.childrens.push(this.convertPersonToChildren(child));
    }

    private bothChildren2() {
        this.bothChildren1();
        this.bothChildren1();
        this.childrens.forEach(function(child) {
            child.brothersSistersFlag = 1;
        });
    }

    private bothChildren3() {
        this.bothChildren1();
        this.bothChildren1();
        this.bothChildren1();
        this.childrens.forEach(function(child) {
            child.brothersSistersFlag = 1;
        });
    }

    private bothFutago2() {
        this.bothChildren1();
        const child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        let child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        this.childrens.forEach(function(child) {
            child.brothersSistersFlag = 1;
        });
    }

    private bothFutago3() {
        this.bothChildren1();
        const child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        let child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        this.bothChildren1();
        this.childrens.forEach(function(child) {
            child.brothersSistersFlag = 1;
        });
    }

    private bothMitsugo3() {
        this.bothChildren1();
        const child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        let child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        let child3 = this.convertPersonToChildren(child);
        child3.multipleBirthsFlag = 1;
        this.childrens.push(child3);
        this.childrens.forEach(function(child) {
            child.brothersSistersFlag = 1;
        });
    }

    private bothMitsugo4() {
        this.bothChildren1();
        const child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        let child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        let child3 = this.convertPersonToChildren(child);
        child3.multipleBirthsFlag = 1;
        this.childrens.push(child3);
        this.bothChildren1();
        this.childrens.forEach(function(child) {
            child.brothersSistersFlag = 1;
        });
    }

};
