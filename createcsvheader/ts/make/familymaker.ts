import {JyusyoMaster} from '../master/jyusyomst';
import {PersonMaster} from '../master/psersonmst';
import {Users, Children, Interviews, Person, Family} from '../dto/dtos';
import {ChildIdMaker, InterviewNoMaker, MailAdressMaker} from '../make/idmanagement';
import {DateUtil} from '../util/datetimeutil';

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

export class FamilyMaker {
    index: number;
    pattern: FamilyPattern;
    userId: string;
    facilityId: string;
    jyusyoMaster: JyusyoMaster;
    personMaster: PersonMaster;
    childIdMaker: ChildIdMaker;
    interviewNoMaker: InterviewNoMaker;
    mailAdress: string;
    user: Users;
    childrens: Array<Children>;
    interviews: Array<Interviews>;
    constructor(index: number, pattern: FamilyPattern, userId: string, facilityId: string
        , childIdMaker: ChildIdMaker, interviewNoMaker: InterviewNoMaker, mailAdress: string
        , jyusyoMaster: JyusyoMaster, personMaster: PersonMaster) {
        this.index = index;
        this.pattern = pattern;
        this.userId = userId;
        this.facilityId = facilityId;
        this.childIdMaker = childIdMaker;
        this.interviewNoMaker = interviewNoMaker;
        this.mailAdress = mailAdress;
        this.jyusyoMaster = jyusyoMaster;
        this.personMaster = personMaster;
        this.childrens = [];
        this.interviews = [];
        this.user = this.makeUser();
    }

    make(): Family {
        this.makeChildren();
        this.makeInterview();
        return {
            user: this.user,
            childrens: this.childrens,
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
            buildingNameRoomNumber: ``,
            relationship: ``,
            emergencyContactName1: emergencyPerson.name,
            emergencyContactKana1: emergencyPerson.kana,
            emergencyContactRelationship1: emergencyPerson.relationship,
            emergencyContactCompany1: ``,
            emergencyContactTel1: emergencyPerson.cellPhoneNumber,
            emergencyContactEmail1: ``,
            emergencyContactName2: ``,
            emergencyContactKana2: ``,
            emergencyContactRelationship2: ``,
            emergencyContactCompany2: ``,
            emergencyContactTel2: ``,
            emergencyContactEmail2: ``,
            emergencyContactName3: ``,
            emergencyContactKana3: ``,
            emergencyContactRelationship3: ``,
            emergencyContactCompany3: ``,
            emergencyContactTel3: ``,
            emergencyContactEmail3: ``,
            welfareHouseholdFlag: ``,
            taxExemptHouseholdFlag: ``,
            singleParentHouseholdFlag: ``,
            fatherlessFlag: ``,
            multipleBirthsHouseholdFlag: ``,
            limitApprovalFlag: ``,
            deleteFlag: ``,
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

    private makeInterview() {
        this.childrens.forEach(child => {
            const reserveDate = DateUtil.getRandomChoiceDate(child.birth);
            const reserveTime = DateUtil.getRandomChoiceTime();
            const interview: Interviews = {
                title: new String(this.index) + ` - ` + this.pattern.title,
                interviewsNo: this.interviewNoMaker.createNewNo(),
                facilityId: this.facilityId,
                firstChoiceDate: reserveDate,
                firstChoiceTimeFrom: reserveTime,
                firstChoiceTimeTo: 0,
                secondChoiceDate: ``,
                secondChoiceTimeFrom: 0,
                secondChoiceTimeTo: 0,
                thirdChoiceDate: ``,
                thirdChoiceTimeFrom: 0,
                thirdChoiceTimeTo: 0,
                reservationFixDate: reserveDate,
                reservationFixTimeFrom: reserveTime,
                reservationFixTimeTo: 0,
                reservationMethod: ``,
                status: ``,
                parentName: this.user.name,
                parentKana: this.user.kana,
                postalCode: this.user.postalCode,
                address1: this.user.address1,
                address2: this.user.address2,
                buildingNameRoomNumber: ``,
                tel: this.user.tel,
                email: this.user.email,
                relationship: ``, // TODO t.yamaguchi これどちらからみたやつ？
                emergencyContactName1: this.user.emergencyContactName1,
                emergencyContactKana1: this.user.emergencyContactKana1,
                emergencyContactRelationship1: this.user.emergencyContactRelationship1,
                emergencyContactCompany1: ``,
                emergencyContactTel1: ``,
                emergencyContactEmail1: ``,
                emergencyContactName2: ``,
                emergencyContactKana2: ``,
                emergencyContactRelationship2: ``,
                emergencyContactCompany2: ``,
                emergencyContactTel2: ``,
                emergencyContactEmail2: ``,
                emergencyContactName3: ``,
                emergencyContactKana3: ``,
                emergencyContactRelationship3: ``,
                emergencyContactCompany3: ``,
                emergencyContactTel3: ``,
                emergencyContactEmail3: ``,
                welfareHouseholdFlag: ``,
                taxExemptHouseholdFlag: ``,
                singleParentHouseholdFlag: ``,
                fatherlessFlag: ``,
                multipleBirthsHouseholdFlag: ``,
                limitApprovalFlag: ``,
                childcareBusinessUserFlag: ``,
                noChildcareProvidedFlag: ``,
                limitOverApprovalFlag: ``,
                regularUseFlag: ``,
                singleUseFlag: ``, //TODO これ何入れる？
                childName: child.childName,
                childKana: child.kana,
                childBirth: child.birth,
                registAge: child.registAge,
                childGender: child.gender,
                bloodType: child.bloodType,
                childMedicalHistoryFlag: ``,
                childMedicalHistoryContent: ``,
                childAllergyFlag: child.childAllergyFlag,
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
                brothersSistersFlag: ``,
                multipleBirthsFlag: ``, // TODO t.yamaguchi これ何入れる？
                disabilitiesFlag: ``,
                note: ``,
                interviewDate: reserveDate,
                permitFlag: ``,
                reason: ``,
                facilityNumber: ``,
                birthHeight: 0,
                birthWeight: 0,
                normal: 0,
                healthPhysical: 0,
                familyHospital: ``,
                familyHospitalTel: ``,
                bedTime: ``,
                wakeupTime: ``,
                napTime: ``,
                napStartTime: ``,
                napEndTime: ``,
                putToSleep: ``,
                fallAsleep: ``,
                excretion: ``,
                leaveChildFlag: ``,
                leaveChildTo: ``,
                userId: this.user.userId,
                childId: child.childId,
            };
            this.interviews.push(interview);
        });
    }

    private convertPersonToChildren(child: Person): Children {
        return  {
            person: child,
            childId: this.childIdMaker.createNewId(),
            userId: this.user.userId,
            childName: child.name,
            kana: child.kana,
            birth: child.birthday,
            registAge: child.age,
            gender: child.sex,
            bloodType: child.bloodType,
            childAllergyFlag: ``,
            allergyCauses1: ``,
            allergySymptoms1:  ``,
            allergyTreatments1:  ``,
            allergyConcerns1:  ``,
            allergyCauses2: ``,
            allergySymptoms2: ``,
            allergyTreatments2: ``,
            allergyConcerns2: ``,
            allergyCauses3: ``,
            allergySymptoms3: ``,
            allergyTreatments3: ``,
            allergyConcerns3: ``,
            brothersSistersFlag: ``,
            multipleBirthsFlag: ``,
            disabilitiesFlag: ``,
            childcareBusinessUserFlag: ``,
            noChildcareProvidedFlag: ``,
            deleteFlag: ``,
        };
    }

    private bothChildren1() {
        const child = this.personMaster.makeRandomFamilyKodomo(this.user.person);
        this.childrens.push(this.convertPersonToChildren(child));
    }

    private bothChildren2() {
        this.bothChildren1();
        this.bothChildren1();
    }

    private bothChildren3() {
        this.bothChildren1();
        this.bothChildren1();
        this.bothChildren1();
    }

    private bothFutago2() {
        this.bothChildren1();
        const child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child));
        // TODO mutipleBirthsFlag
    }

    private bothFutago3() {
        this.bothChildren1();
        const child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child));
        this.bothChildren1();
        // TODO mutipleBirthsFlag
    }

    private bothMitsugo3() {
        this.bothChildren1();
        const child1 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child1));
        const child2 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child2));
        // TODO mutipleBirthsFlag
    }

    private bothMitsugo4() {
        this.bothChildren1();
        const child1 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child1));
        const child2 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child2));
        this.bothChildren1();
        // TODO mutipleBirthsFlag
    }

};
