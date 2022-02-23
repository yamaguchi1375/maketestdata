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
            buildingNameRoomNumber: `NULL`,
            relationship: `NULL`,
            emergencyContactName1: emergencyPerson.name,
            emergencyContactKana1: emergencyPerson.kana,
            emergencyContactRelationship1: emergencyPerson.relationship,
            emergencyContactCompany1: `NULL`,
            emergencyContactTel1: emergencyPerson.cellPhoneNumber,
            emergencyContactEmail1: `NULL`,
            emergencyContactName2: `NULL`,
            emergencyContactKana2: `NULL`,
            emergencyContactRelationship2: `NULL`,
            emergencyContactCompany2: `NULL`,
            emergencyContactTel2: `NULL`,
            emergencyContactEmail2: `NULL`,
            emergencyContactName3: `NULL`,
            emergencyContactKana3: `NULL`,
            emergencyContactRelationship3: `NULL`,
            emergencyContactCompany3: `NULL`,
            emergencyContactTel3: `NULL`,
            emergencyContactEmail3: `NULL`,
            welfareHouseholdFlag: 0,
            taxExemptHouseholdFlag: 0,
            singleParentHouseholdFlag: 0,
            multipleBirthsHouseholdFlag: 0,
            deleteFlag: 0,
            createUser: `NULL`,
            createDatetime: `NULL`,
            updateUser: `NULL`,
            updateDatetime: `NULL`
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
            const reserveDate = DateUtil.getRandomChoiceDate(child.birthday);
            const reserveTime = DateUtil.getRandomChoiceTime();
            const interview: Interviews = {
                title: new String(this.index) + ` - ` + this.pattern.title,
                interviewNo: this.interviewNoMaker.createNewNo(),
                facilityId: this.facilityId,
                firstChoiceDate: reserveDate,
                firstChoiceTimeFrom: reserveTime,
                firstChoiceTimeTo: `NULL`,
                secondChoiceDate: `NULL`,
                secondChoiceTimeFrom: `NULL`,
                secondChoiceTimeTo: `NULL`,
                thirdChoiceDate: `NULL`,
                thirdChoiceTimeFrom: `NULL`,
                thirdChoiceTimeTo: `NULL`,
                reservationFixDate: reserveDate,
                reservationFixTimeFrom: reserveTime,
                reservationFixTimeTo: `NULL`,
                reservationMethod: 0,
                reservationDatetime: `NULL`,
                status: 0,
                parentName: this.user.name,
                parentKana: this.user.kana,
                postalCode: this.user.postalCode,
                address1: this.user.address1,
                address2: this.user.address2,
                buildingNameRoomNumber: `NULL`,
                tel: this.user.tel,
                email: this.user.email,
                relationship: `NULL`, // TODO t.yamaguchi これどちらからみたやつ？
                emergencyContactName1: this.user.emergencyContactName1,
                emergencyContactKana1: this.user.emergencyContactKana1,
                emergencyContactRelationship1: this.user.emergencyContactRelationship1,
                emergencyContactCompany1: `NULL`,
                emergencyContactTel1: `NULL`,
                emergencyContactEmail1: `NULL`,
                emergencyContactName2: `NULL`,
                emergencyContactKana2: `NULL`,
                emergencyContactRelationship2: `NULL`,
                emergencyContactCompany2: `NULL`,
                emergencyContactTel2: `NULL`,
                emergencyContactEmail2: `NULL`,
                emergencyContactName3: `NULL`,
                emergencyContactKana3: `NULL`,
                emergencyContactRelationship3: `NULL`,
                emergencyContactCompany3: `NULL`,
                emergencyContactTel3: `NULL`,
                emergencyContactEmail3: `NULL`,
                welfareHouseholdFlag: 0,
                taxExemptHouseholdFlag: 0,
                singleParentHouseholdFlag: 0,
                multipleBirthsHouseholdFlag: 0,
                limitApprovalFlag: 0,
                childcareBusinessUserFlag: 0,
                noChildcareProvidedFlag: 0,
                limitOverApprovalFlag: 0,
                regularUseFlag: 0,
                singleUseFlag: 0, //TODO これ何入れる？
                childName: child.name,
                childKana: child.kana,
                childBirth: child.birthday,
                registAge: child.registAge,
                childGender: child.gender,
                bloodType: child.bloodType,
                childMedicalHistoryFlag: 0,
                childAllergyFlag: child.allergyFlag,
                citizenChildAllergy: `NULL`,
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
                brothersSistersFlag: 0,
                multipleBirthsFlag: 0, // TODO t.yamaguchi これ何入れる？
                disabilities: 0,
                note: `NULL`,
                interviewDate: reserveDate,
                permitFlag: 0,
                reason: `NULL`,
                facilityNumber: `NULL`,
                birthHeight: `NULL`,
                birthWeight: `NULL`,
                normalTemperature: `NULL`,
                medicalHistoryContent: `NULL`,
                healthPhysicalDevelopmentConcerns: `NULL`,
                familyHospital: `NULL`,
                familyHospitalTel: `NULL`,
                bedTime: `NULL`,
                wakeupTime: `NULL`,
                napTime: 0,
                napStartTime: `NULL`,
                napEndTime: `NULL`,
                putToSleep: 0,
                fallAsleep: 0,
                excretion: 0,
                leaveChildFlag: 0,
                leaveChildTo: 0,
                userId: this.user.userId,
                childId: child.childId,
                createUser: `NULL`,
                createDatetime: `NULL`,
                updateUser: `NULL`,
                updateDatetime: `NULL`
            };
            this.interviews.push(interview);
        });
    }

    private convertPersonToChildren(child: Person): Children {
        return  {
            person: child,
            childId: this.childIdMaker.createNewId(),
            userId: this.user.userId,
            name: child.name,
            kana: child.kana,
            birthday: child.birthday,
            registAge: child.age,
            gender: child.gender,
            bloodType: child.bloodType,
            allergyFlag: 0,
            allergyCauses1: `NULL`,
            allergySymptoms1:  `NULL`,
            allergyTreatments1:  `NULL`,
            allergyConcerns1:  `NULL`,
            allergyCauses2: `NULL`,
            allergySymptoms2: `NULL`,
            allergyTreatments2: `NULL`,
            allergyConcerns2: `NULL`,
            allergyCauses3: `NULL`,
            allergySymptoms3: `NULL`,
            allergyTreatments3: `NULL`,
            allergyConcerns3: `NULL`,
            brothersSistersFlag: 0,
            multipleBirthsFlag: 0,
            disabilities: 0,
            childcareBusinessUserFlag: 0,
            noChildcareProvidedFlag: 0,
            limitApprovalFlag: 0,
            deleteFlag: 0,
            createUser: `NULL`,
            createDatetime: `NULL`,
            updateUser: `NULL`,
            updateDatetime: `NULL`
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
