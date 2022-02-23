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
            buildingNameRoomNumber: "",
            relationship: "",
            emergencyContactName1: emergencyPerson.name,
            emergencyContactKana1: emergencyPerson.kana,
            emergencyContactRelationship1: emergencyPerson.relationship,
            emergencyContactCompany1: "",
            emergencyContactTel1: emergencyPerson.cellPhoneNumber,
            emergencyContactEmail1: "",
            emergencyContactName2: "",
            emergencyContactKana2: "",
            emergencyContactRelationship2: "",
            emergencyContactCompany2: "",
            emergencyContactTel2: "",
            emergencyContactEmail2: "",
            emergencyContactName3: "",
            emergencyContactKana3: "",
            emergencyContactRelationship3: "",
            emergencyContactCompany3: "",
            emergencyContactTel3: "",
            emergencyContactEmail3: "",
            welfareHouseholdFlag: "",
            taxExemptHouseholdFlag: "",
            singleParentHouseholdFlag: "",
            fatherlessFlag: "",
            multipleBirthsHouseholdFlag: "",
            limitApprovalFlag: "",
            deleteFlag: "",
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
            var reserveDate = datetimeutil_1.DateUtil.getRandomChoiceDate(child.birth);
            var reserveTime = datetimeutil_1.DateUtil.getRandomChoiceTime();
            var interview = {
                title: new String(_this.index) + " - " + _this.pattern.title,
                interviewsNo: _this.interviewNoMaker.createNewNo(),
                facilityId: _this.facilityId,
                firstChoiceDate: reserveDate,
                firstChoiceTimeFrom: reserveTime,
                firstChoiceTimeTo: 0,
                secondChoiceDate: "",
                secondChoiceTimeFrom: 0,
                secondChoiceTimeTo: 0,
                thirdChoiceDate: "",
                thirdChoiceTimeFrom: 0,
                thirdChoiceTimeTo: 0,
                reservationFixDate: reserveDate,
                reservationFixTimeFrom: reserveTime,
                reservationFixTimeTo: 0,
                reservationMethod: "",
                status: "",
                parentName: _this.user.name,
                parentKana: _this.user.kana,
                postalCode: _this.user.postalCode,
                address1: _this.user.address1,
                address2: _this.user.address2,
                buildingNameRoomNumber: "",
                tel: _this.user.tel,
                email: _this.user.email,
                relationship: "",
                emergencyContactName1: _this.user.emergencyContactName1,
                emergencyContactKana1: _this.user.emergencyContactKana1,
                emergencyContactRelationship1: _this.user.emergencyContactRelationship1,
                emergencyContactCompany1: "",
                emergencyContactTel1: "",
                emergencyContactEmail1: "",
                emergencyContactName2: "",
                emergencyContactKana2: "",
                emergencyContactRelationship2: "",
                emergencyContactCompany2: "",
                emergencyContactTel2: "",
                emergencyContactEmail2: "",
                emergencyContactName3: "",
                emergencyContactKana3: "",
                emergencyContactRelationship3: "",
                emergencyContactCompany3: "",
                emergencyContactTel3: "",
                emergencyContactEmail3: "",
                welfareHouseholdFlag: "",
                taxExemptHouseholdFlag: "",
                singleParentHouseholdFlag: "",
                fatherlessFlag: "",
                multipleBirthsHouseholdFlag: "",
                limitApprovalFlag: "",
                childcareBusinessUserFlag: "",
                noChildcareProvidedFlag: "",
                limitOverApprovalFlag: "",
                regularUseFlag: "",
                singleUseFlag: "",
                childName: child.childName,
                childKana: child.kana,
                childBirth: child.birth,
                registAge: child.registAge,
                childGender: child.gender,
                bloodType: child.bloodType,
                childMedicalHistoryFlag: "",
                childMedicalHistoryContent: "",
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
                brothersSistersFlag: "",
                multipleBirthsFlag: "",
                disabilitiesFlag: "",
                note: "",
                interviewDate: reserveDate,
                permitFlag: "",
                reason: "",
                facilityNumber: "",
                birthHeight: 0,
                birthWeight: 0,
                normal: 0,
                healthPhysical: 0,
                familyHospital: "",
                familyHospitalTel: "",
                bedTime: "",
                wakeupTime: "",
                napTime: "",
                napStartTime: "",
                napEndTime: "",
                putToSleep: "",
                fallAsleep: "",
                excretion: "",
                leaveChildFlag: "",
                leaveChildTo: "",
                userId: _this.user.userId,
                childId: child.childId,
            };
            _this.interviews.push(interview);
        });
    };
    FamilyMaker.prototype.convertPersonToChildren = function (child) {
        return {
            person: child,
            childId: this.childIdMaker.createNewId(),
            userId: this.user.userId,
            childName: child.name,
            kana: child.kana,
            birth: child.birthday,
            registAge: child.age,
            gender: child.sex,
            bloodType: child.bloodType,
            childAllergyFlag: "",
            allergyCauses1: "",
            allergySymptoms1: "",
            allergyTreatments1: "",
            allergyConcerns1: "",
            allergyCauses2: "",
            allergySymptoms2: "",
            allergyTreatments2: "",
            allergyConcerns2: "",
            allergyCauses3: "",
            allergySymptoms3: "",
            allergyTreatments3: "",
            allergyConcerns3: "",
            brothersSistersFlag: "",
            multipleBirthsFlag: "",
            disabilitiesFlag: "",
            childcareBusinessUserFlag: "",
            noChildcareProvidedFlag: "",
            deleteFlag: "",
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
