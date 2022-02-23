"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMaker = exports.FamilyPattern = void 0;
var datetimeutil_1 = require("../util/datetimeutil");
exports.FamilyPattern = {
    Children1: { title: "\u5B50\u4F9B 1", parent: "both", children: 1, futago: 0, mitsugo: 0 },
    Children2: { title: "\u5B50\u4F9B 2", parent: "both", children: 2, futago: 0, mitsugo: 0 },
    Children3: { title: "\u5B50\u4F9B 3", parent: "both", children: 3, futago: 0, mitsugo: 0 },
    Futago2: { title: "\u53CC\u5B50", parent: "both", children: 0, futago: 1, mitsugo: 0 },
    Futago3: { title: "\u53CC\u5B50 + 1", parent: "both", children: 1, futago: 1, mitsugo: 0 },
    Mitsugo3: { title: "\u4E09\u5B50", parent: "both", children: 0, futago: 0, mitsugo: 1 },
    Mitsugo4: { title: "\u4E09\u5B50 + 1", parent: "both", children: 1, futago: 1, mitsugo: 1 },
    SingleParent1: { title: "\u4E21\u89AA 1 \u5B50\u4F9B 1", parent: "single", children: 1, futago: 0, mitsugo: 0 },
    SingleParent2: { title: "\u4E21\u89AA 1 \u5B50\u4F9B 2", parent: "single", children: 2, futago: 0, mitsugo: 0 },
};
var FamilyMaker = /** @class */ (function () {
    function FamilyMaker(index, pattern, userId, facilityId, childIdMaker, interviewNoMaker, mailAdress, jyusyoMaster, personMaster) {
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
    FamilyMaker.prototype.make = function () {
        this.makeChildren();
        this.makeInterview();
        return {
            user: this.user,
            childrens: this.childrens,
            interviews: this.interviews
        };
    };
    FamilyMaker.prototype.getUser = function () {
        return this.user;
    };
    FamilyMaker.prototype.getChildrens = function () {
        return this.childrens;
    };
    FamilyMaker.prototype.getChildInterviews = function () {
        return this.interviews;
    };
    FamilyMaker.prototype.makeUser = function () {
        var person = this.personMaster.getRandomOtona();
        var jyusyo = this.jyusyoMaster.getRandomJyusyo();
        var emergencyPerson = this.personMaster.makeRandomFamilySohuSobo(person);
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
            buildingNameRoomNumber: "NULL",
            relationship: "NULL",
            emergencyContactName1: emergencyPerson.name,
            emergencyContactKana1: emergencyPerson.kana,
            emergencyContactRelationship1: emergencyPerson.relationship,
            emergencyContactCompany1: "NULL",
            emergencyContactTel1: emergencyPerson.cellPhoneNumber,
            emergencyContactEmail1: "NULL",
            emergencyContactName2: "NULL",
            emergencyContactKana2: "NULL",
            emergencyContactRelationship2: "NULL",
            emergencyContactCompany2: "NULL",
            emergencyContactTel2: "NULL",
            emergencyContactEmail2: "NULL",
            emergencyContactName3: "NULL",
            emergencyContactKana3: "NULL",
            emergencyContactRelationship3: "NULL",
            emergencyContactCompany3: "NULL",
            emergencyContactTel3: "NULL",
            emergencyContactEmail3: "NULL",
            welfareHouseholdFlag: 0,
            taxExemptHouseholdFlag: 0,
            singleParentHouseholdFlag: 0,
            multipleBirthsHouseholdFlag: 0,
            deleteFlag: 0,
            createUser: "NULL",
            createDatetime: "NULL",
            updateUser: "NULL",
            updateDatetime: "NULL"
        };
    };
    FamilyMaker.prototype.makeChildren = function () {
        switch (this.pattern) {
            case exports.FamilyPattern.Children1:
                this.bothChildren1();
                break;
            case exports.FamilyPattern.Children2:
                this.bothChildren2();
                break;
            case exports.FamilyPattern.Children3:
                this.bothChildren3();
                break;
            case exports.FamilyPattern.Futago2:
                this.bothFutago2();
                break;
            case exports.FamilyPattern.Futago3:
                this.bothFutago3();
                break;
            case exports.FamilyPattern.Mitsugo3:
                this.bothMitsugo3();
                break;
            case exports.FamilyPattern.Mitsugo4:
                this.bothMitsugo4();
                break;
            default:
                throw new Error("not supoort FamilyPatter!! pattern: " + this.pattern);
        }
    };
    FamilyMaker.prototype.makeInterview = function () {
        var _this = this;
        this.childrens.forEach(function (child) {
            var reserveDate = datetimeutil_1.DateUtil.getRandomChoiceDate(child.birthday);
            var reserveTime = datetimeutil_1.DateUtil.getRandomChoiceTime();
            var interview = {
                title: new String(_this.index) + " - " + _this.pattern.title,
                interviewNo: _this.interviewNoMaker.createNewNo(),
                facilityId: _this.facilityId,
                firstChoiceDate: reserveDate,
                firstChoiceTimeFrom: reserveTime,
                firstChoiceTimeTo: "NULL",
                secondChoiceDate: "NULL",
                secondChoiceTimeFrom: "NULL",
                secondChoiceTimeTo: "NULL",
                thirdChoiceDate: "NULL",
                thirdChoiceTimeFrom: "NULL",
                thirdChoiceTimeTo: "NULL",
                reservationFixDate: reserveDate,
                reservationFixTimeFrom: reserveTime,
                reservationFixTimeTo: "NULL",
                reservationMethod: 0,
                reservationDatetime: "NULL",
                status: 0,
                parentName: _this.user.name,
                parentKana: _this.user.kana,
                postalCode: _this.user.postalCode,
                address1: _this.user.address1,
                address2: _this.user.address2,
                buildingNameRoomNumber: "NULL",
                tel: _this.user.tel,
                email: _this.user.email,
                relationship: "NULL",
                emergencyContactName1: _this.user.emergencyContactName1,
                emergencyContactKana1: _this.user.emergencyContactKana1,
                emergencyContactRelationship1: _this.user.emergencyContactRelationship1,
                emergencyContactCompany1: "NULL",
                emergencyContactTel1: "NULL",
                emergencyContactEmail1: "NULL",
                emergencyContactName2: "NULL",
                emergencyContactKana2: "NULL",
                emergencyContactRelationship2: "NULL",
                emergencyContactCompany2: "NULL",
                emergencyContactTel2: "NULL",
                emergencyContactEmail2: "NULL",
                emergencyContactName3: "NULL",
                emergencyContactKana3: "NULL",
                emergencyContactRelationship3: "NULL",
                emergencyContactCompany3: "NULL",
                emergencyContactTel3: "NULL",
                emergencyContactEmail3: "NULL",
                welfareHouseholdFlag: 0,
                taxExemptHouseholdFlag: 0,
                singleParentHouseholdFlag: 0,
                multipleBirthsHouseholdFlag: 0,
                limitApprovalFlag: 0,
                childcareBusinessUserFlag: 0,
                noChildcareProvidedFlag: 0,
                limitOverApprovalFlag: 0,
                regularUseFlag: 0,
                singleUseFlag: 0,
                childName: child.name,
                childKana: child.kana,
                childBirth: child.birthday,
                registAge: child.registAge,
                childGender: child.gender,
                bloodType: child.bloodType,
                childMedicalHistoryFlag: 0,
                childAllergyFlag: child.allergyFlag,
                citizenChildAllergy: "NULL",
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
                multipleBirthsFlag: 0,
                disabilities: 0,
                note: "NULL",
                interviewDate: reserveDate,
                permitFlag: 0,
                reason: "NULL",
                facilityNumber: "NULL",
                birthHeight: "NULL",
                birthWeight: "NULL",
                normalTemperature: "NULL",
                medicalHistoryContent: "NULL",
                healthPhysicalDevelopmentConcerns: "NULL",
                familyHospital: "NULL",
                familyHospitalTel: "NULL",
                bedTime: "NULL",
                wakeupTime: "NULL",
                napTime: 0,
                napStartTime: "NULL",
                napEndTime: "NULL",
                putToSleep: 0,
                fallAsleep: 0,
                excretion: 0,
                leaveChildFlag: 0,
                leaveChildTo: 0,
                userId: _this.user.userId,
                childId: child.childId,
                createUser: "NULL",
                createDatetime: "NULL",
                updateUser: "NULL",
                updateDatetime: "NULL"
            };
            _this.interviews.push(interview);
        });
    };
    FamilyMaker.prototype.convertPersonToChildren = function (child) {
        return {
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
            allergyCauses1: "NULL",
            allergySymptoms1: "NULL",
            allergyTreatments1: "NULL",
            allergyConcerns1: "NULL",
            allergyCauses2: "NULL",
            allergySymptoms2: "NULL",
            allergyTreatments2: "NULL",
            allergyConcerns2: "NULL",
            allergyCauses3: "NULL",
            allergySymptoms3: "NULL",
            allergyTreatments3: "NULL",
            allergyConcerns3: "NULL",
            brothersSistersFlag: 0,
            multipleBirthsFlag: 0,
            disabilities: 0,
            childcareBusinessUserFlag: 0,
            noChildcareProvidedFlag: 0,
            limitApprovalFlag: 0,
            deleteFlag: 0,
            createUser: "NULL",
            createDatetime: "NULL",
            updateUser: "NULL",
            updateDatetime: "NULL"
        };
    };
    FamilyMaker.prototype.bothChildren1 = function () {
        var child = this.personMaster.makeRandomFamilyKodomo(this.user.person);
        this.childrens.push(this.convertPersonToChildren(child));
    };
    FamilyMaker.prototype.bothChildren2 = function () {
        this.bothChildren1();
        this.bothChildren1();
    };
    FamilyMaker.prototype.bothChildren3 = function () {
        this.bothChildren1();
        this.bothChildren1();
        this.bothChildren1();
    };
    FamilyMaker.prototype.bothFutago2 = function () {
        this.bothChildren1();
        var child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child));
        // TODO mutipleBirthsFlag
    };
    FamilyMaker.prototype.bothFutago3 = function () {
        this.bothChildren1();
        var child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child));
        this.bothChildren1();
        // TODO mutipleBirthsFlag
    };
    FamilyMaker.prototype.bothMitsugo3 = function () {
        this.bothChildren1();
        var child1 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child1));
        var child2 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child2));
        // TODO mutipleBirthsFlag
    };
    FamilyMaker.prototype.bothMitsugo4 = function () {
        this.bothChildren1();
        var child1 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child1));
        var child2 = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens.push(this.convertPersonToChildren(child2));
        this.bothChildren1();
        // TODO mutipleBirthsFlag
    };
    return FamilyMaker;
}());
exports.FamilyMaker = FamilyMaker;
;
