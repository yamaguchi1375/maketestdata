"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMaker = exports.FamilyPattern = void 0;
var datetimeutil_1 = require("../util/datetimeutil");
var entity_1 = require("../dto/entity");
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
var STAGING_FACILITY_USER_ID = 'afb530ae-a1e7-477c-aab5-9a779603e2d6';
var DATE_CRAETE_PRC_DATE = '2022-02-22 10:07:31.996';
var FamilyMaker = /** @class */ (function () {
    function FamilyMaker(index, pattern, userId, facilityId, interviewNoMaker, mailAdress, jyusyoMaster, personMaster) {
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
        this.multipleBirthsHouseholdFlag = 0;
        switch (this.pattern) {
            case exports.FamilyPattern.Children1:
            case exports.FamilyPattern.Children2:
            case exports.FamilyPattern.Children3:
                this.multipleBirthsHouseholdFlag = 0;
                break;
            case exports.FamilyPattern.Futago2:
            case exports.FamilyPattern.Futago3:
            case exports.FamilyPattern.Mitsugo3:
            case exports.FamilyPattern.Mitsugo4:
                this.multipleBirthsHouseholdFlag = 1;
                break;
            default:
                this.multipleBirthsHouseholdFlag = 0;
        }
        this.user = this.makeUser();
    }
    FamilyMaker.prototype.make = function () {
        this.makeChildren();
        this.makeChildrenDetail();
        this.makeInterview();
        return {
            user: this.user,
            childrens: this.childrens,
            childrendetails: this.childrenDetails,
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
        var basic = __assign({}, entity_1.basicUserEntity);
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
    FamilyMaker.prototype.makeChildrenDetail = function () {
        var _this = this;
        var basic = __assign({}, entity_1.basicChildrenDetailEntity);
        this.childrens.forEach(function (child) {
            var detail = {
                childId: child.childId,
                userId: child.userId,
                facilityId: _this.facilityId,
                facilityChildNumber: entity_1.basicChildrenDetailEntity.facilityChildNumber,
                regularUseFlag: entity_1.basicChildrenDetailEntity.regularUseFlag,
                singleUseFlag: entity_1.basicChildrenDetailEntity.singleUseFlag,
                limitOverApprovalFlag: entity_1.basicChildrenDetailEntity.limitOverApprovalFlag,
                birthHeight: entity_1.basicChildrenDetailEntity.birthHeight,
                birthWeight: entity_1.basicChildrenDetailEntity.birthWeight,
                normalTemperature: entity_1.basicChildrenDetailEntity.normalTemperature,
                medicalHistoryContent: entity_1.basicChildrenDetailEntity.medicalHistoryContent,
                healthPhysicalDevelopmentConcerns: entity_1.basicChildrenDetailEntity.healthPhysicalDevelopmentConcerns,
                familyHospital: entity_1.basicChildrenDetailEntity.familyHospital,
                familyHospitalTel: entity_1.basicChildrenDetailEntity.familyHospitalTel,
                bedTime: entity_1.basicChildrenDetailEntity.bedTime,
                wakeupTime: entity_1.basicChildrenDetailEntity.wakeupTime,
                napTime: entity_1.basicChildrenDetailEntity.napTime,
                napStartTime: entity_1.basicChildrenDetailEntity.napStartTime,
                napEndTime: entity_1.basicChildrenDetailEntity.napEndTime,
                putToSleep: entity_1.basicChildrenDetailEntity.putToSleep,
                fallAsleep: entity_1.basicChildrenDetailEntity.fallAsleep,
                excretion: entity_1.basicChildrenDetailEntity.excretion,
                leaveChildFlag: entity_1.basicChildrenDetailEntity.leaveChildFlag,
                leaveChildTo: entity_1.basicChildrenDetailEntity.leaveChildTo,
                note: entity_1.basicChildrenDetailEntity.note,
                createUser: child.createUser,
                createDatetime: child.createDatetime,
                updateUser: child.updateUser,
                updateDatetime: child.updateDatetime
            };
            _this.childrenDetails.push(detail);
        });
    };
    FamilyMaker.prototype.makeInterview = function () {
        var _this = this;
        var basicInterview = __assign({}, entity_1.basicInterviewsEntity);
        this.childrens.forEach(function (child) {
            var reserveDate = datetimeutil_1.DateUtil.getRandomChoiceDate(child.birthday);
            var reserveTime = datetimeutil_1.DateUtil.getRandomChoiceTime();
            var reserveETime = datetimeutil_1.DateUtil.getEndReservDatetime(reserveTime);
            var interview = {
                title: new String(_this.index) + " - " + _this.pattern.title,
                interviewNo: "",
                facilityId: _this.facilityId,
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
                parentName: _this.user.name,
                parentKana: _this.user.kana,
                postalCode: _this.user.postalCode,
                address1: _this.user.address1,
                address2: _this.user.address2,
                buildingNameRoomNumber: basicInterview.buildingNameRoomNumber,
                tel: _this.user.tel,
                email: _this.user.email,
                relationship: basicInterview.relationship,
                emergencyContactName1: _this.user.emergencyContactName1,
                emergencyContactKana1: _this.user.emergencyContactKana1,
                emergencyContactRelationship1: _this.user.emergencyContactRelationship1,
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
                multipleBirthsHouseholdFlag: _this.multipleBirthsHouseholdFlag,
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
                userId: _this.user.userId,
                childId: child.childId,
                createUser: STAGING_FACILITY_USER_ID,
                createDatetime: DATE_CRAETE_PRC_DATE,
                updateUser: STAGING_FACILITY_USER_ID,
                updateDatetime: DATE_CRAETE_PRC_DATE
            };
            _this.interviews.push(interview);
        });
    };
    FamilyMaker.prototype.convertPersonToChildren = function (child) {
        var basic = __assign({}, entity_1.basicChildrenEntity);
        return {
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
            allergySymptoms1: basic.allergySymptoms1,
            allergyTreatments1: basic.allergyTreatments1,
            allergyConcerns1: basic.allergyConcerns1,
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
    };
    FamilyMaker.prototype.bothChildren1 = function () {
        var child = this.personMaster.makeRandomFamilyKodomo(this.user.person);
        this.childrens.push(this.convertPersonToChildren(child));
    };
    FamilyMaker.prototype.bothChildren2 = function () {
        this.bothChildren1();
        this.bothChildren1();
        this.childrens.forEach(function (child) {
            child.brothersSistersFlag = 1;
        });
    };
    FamilyMaker.prototype.bothChildren3 = function () {
        this.bothChildren1();
        this.bothChildren1();
        this.bothChildren1();
        this.childrens.forEach(function (child) {
            child.brothersSistersFlag = 1;
        });
    };
    FamilyMaker.prototype.bothFutago2 = function () {
        this.bothChildren1();
        var child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        var child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        this.childrens.forEach(function (child) {
            child.brothersSistersFlag = 1;
        });
    };
    FamilyMaker.prototype.bothFutago3 = function () {
        this.bothChildren1();
        var child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        var child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        this.bothChildren1();
        this.childrens.forEach(function (child) {
            child.brothersSistersFlag = 1;
        });
    };
    FamilyMaker.prototype.bothMitsugo3 = function () {
        this.bothChildren1();
        var child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        var child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        var child3 = this.convertPersonToChildren(child);
        child3.multipleBirthsFlag = 1;
        this.childrens.push(child3);
        this.childrens.forEach(function (child) {
            child.brothersSistersFlag = 1;
        });
    };
    FamilyMaker.prototype.bothMitsugo4 = function () {
        this.bothChildren1();
        var child = this.personMaster.makeRandomFamilyTataiji(this.childrens[0].person);
        this.childrens[0].multipleBirthsFlag = 1;
        var child2 = this.convertPersonToChildren(child);
        child2.multipleBirthsFlag = 1;
        this.childrens.push(child2);
        var child3 = this.convertPersonToChildren(child);
        child3.multipleBirthsFlag = 1;
        this.childrens.push(child3);
        this.bothChildren1();
        this.childrens.forEach(function (child) {
            child.brothersSistersFlag = 1;
        });
    };
    return FamilyMaker;
}());
exports.FamilyMaker = FamilyMaker;
;
