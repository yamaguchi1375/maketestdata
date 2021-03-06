import { Children, Interviews, Users } from "./dtos";

export interface Entity {

}

export class EntityConverter {
    static convertUsersEntity(users: Users): UsersEntity {
        return {
            userId: users.userId,
            name: users.name,
            kana: users.kana,
            tel: users.tel,
            email: users.email,
            postalCode: users.postalCode,
            address1: users.address1,
            address2: users.address2,
            buildingNameRoomNumber: users.buildingNameRoomNumber,
            relationship: users.relationship,
            emergencyContactName1: users.emergencyContactName1,
            emergencyContactKana1: users.emergencyContactKana1,
            emergencyContactRelationship1: users.emergencyContactRelationship1,
            emergencyContactCompany1: users.emergencyContactCompany1,
            emergencyContactTel1: users.emergencyContactTel1,
            emergencyContactEmail1: users.emergencyContactEmail1,
            emergencyContactName2: users.emergencyContactName2,
            emergencyContactKana2: users.emergencyContactKana2,
            emergencyContactRelationship2: users.emergencyContactRelationship2,
            emergencyContactCompany2: users.emergencyContactCompany2,
            emergencyContactTel2: users.emergencyContactTel2,
            emergencyContactEmail2: users.emergencyContactEmail2,
            emergencyContactName3: users.emergencyContactName3,
            emergencyContactKana3: users.emergencyContactKana3,
            emergencyContactRelationship3: users.emergencyContactRelationship3,
            emergencyContactCompany3: users.emergencyContactCompany3,
            emergencyContactTel3: users.emergencyContactTel3,
            emergencyContactEmail3: users.emergencyContactEmail3,
            welfareHouseholdFlag: users.welfareHouseholdFlag,
            taxExemptHouseholdFlag: users.taxExemptHouseholdFlag,
            singleParentHouseholdFlag: users.singleParentHouseholdFlag,
            multipleBirthsHouseholdFlag: users.multipleBirthsHouseholdFlag,
            deleteFlag: users.deleteFlag,
            createUser: users.createUser,
            createDatetime: users.createDatetime,
            updateUser: users.updateUser,
            updateDatetime: users.updateDatetime
        };
    };
    static convertChildrenEntites(childrens: Array<Children>): Array<ChildrenEntity> {
        const entites = new Array<ChildrenEntity>();
        childrens
        .map(child => this.convertChildrenEntity(child))
        .forEach(child => entites.push(child));
        return entites;
    };
    static convertChildrenEntity(child: Children): ChildrenEntity {
        return {
            childId: child.childId,
            userId: child.userId,
            name: child.name,
            kana: child.kana,
            birthday: child.birthday,
            registAge: child.registAge,
            gender: child.gender,
            bloodType: child.bloodType,
            allergyFlag: child.allergyFlag,
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
            brothersSistersFlag: child.brothersSistersFlag,
            multipleBirthsFlag: child.multipleBirthsFlag,
            disabilities: child.disabilities,
            childcareBusinessUserFlag: child.childcareBusinessUserFlag,
            noChildcareProvidedFlag: child.noChildcareProvidedFlag,
            limitApprovalFlag: child.limitApprovalFlag,
            deleteFlag: child.deleteFlag,
            createUser: child.createUser,
            createDatetime: child.createDatetime,
            updateUser: child.updateUser,
            updateDatetime: child.updateDatetime
        };
    };
    static convertInterviewsEntites(entites: Array<Interviews>): Array<InterviewsEntity> {
        const result = new Array<InterviewsEntity>();
        entites
        .forEach(entity => result.push(this.convertInterviewsEntity(entity)));
        return result;
    }
    static convertInterviewsEntity(interviews: Interviews): InterviewsEntity {
        return {
            interviewNo: interviews.interviewNo,
            facilityId: interviews.facilityId,
            firstChoiceDate: interviews.firstChoiceDate,
            firstChoiceTimeFrom: interviews.firstChoiceTimeFrom,
            firstChoiceTimeTo: interviews.firstChoiceTimeTo,
            secondChoiceDate: interviews.secondChoiceDate,
            secondChoiceTimeFrom: interviews.secondChoiceTimeFrom,
            secondChoiceTimeTo: interviews.secondChoiceTimeTo,
            thirdChoiceDate: interviews.thirdChoiceDate,
            thirdChoiceTimeFrom: interviews.thirdChoiceTimeFrom,
            thirdChoiceTimeTo: interviews.thirdChoiceTimeTo,
            reservationFixDate: interviews.reservationFixDate,
            reservationFixTimeFrom: interviews.reservationFixTimeFrom,
            reservationFixTimeTo: interviews.reservationFixTimeTo,
            reservationMethod: interviews.reservationMethod,
            reservationDatetime: interviews.reservationDatetime,
            status: interviews.status,
            parentName: interviews.parentName,
            parentKana: interviews.parentKana,
            postalCode: interviews.postalCode,
            address1: interviews.address1,
            address2: interviews.address2,
            buildingNameRoomNumber: interviews.buildingNameRoomNumber,
            tel: interviews.tel,
            email: interviews.email,
            relationship: interviews.relationship,
            emergencyContactName1: interviews.emergencyContactName1,
            emergencyContactKana1: interviews.emergencyContactKana1,
            emergencyContactRelationship1: interviews.emergencyContactRelationship1,
            emergencyContactCompany1: interviews.emergencyContactCompany1,
            emergencyContactTel1: interviews.emergencyContactTel1,
            emergencyContactEmail1: interviews.emergencyContactEmail1,
            emergencyContactName2: interviews.emergencyContactName2,
            emergencyContactKana2: interviews.emergencyContactKana2,
            emergencyContactRelationship2: interviews.emergencyContactRelationship2,
            emergencyContactCompany2: interviews.emergencyContactCompany2,
            emergencyContactTel2: interviews.emergencyContactTel2,
            emergencyContactEmail2: interviews.emergencyContactEmail2,
            emergencyContactName3: interviews.emergencyContactName3,
            emergencyContactKana3: interviews.emergencyContactKana3,
            emergencyContactRelationship3: interviews.emergencyContactRelationship3,
            emergencyContactCompany3: interviews.emergencyContactCompany3,
            emergencyContactTel3: interviews.emergencyContactTel3,
            emergencyContactEmail3: interviews.emergencyContactEmail3,
            welfareHouseholdFlag: interviews.welfareHouseholdFlag,
            taxExemptHouseholdFlag: interviews.taxExemptHouseholdFlag,
            singleParentHouseholdFlag: interviews.singleParentHouseholdFlag,
            multipleBirthsHouseholdFlag: interviews.multipleBirthsHouseholdFlag,
            limitApprovalFlag: interviews.limitApprovalFlag,
            childcareBusinessUserFlag: interviews.childcareBusinessUserFlag,
            noChildcareProvidedFlag: interviews.noChildcareProvidedFlag,
            limitOverApprovalFlag: interviews.limitOverApprovalFlag,
            regularUseFlag: interviews.regularUseFlag,
            singleUseFlag: interviews.singleUseFlag,
            childName: interviews.childName,
            childKana: interviews.childKana,
            childBirth: interviews.childBirth,
            registAge: interviews.registAge,
            childGender: interviews.childGender,
            bloodType: interviews.bloodType,
            childMedicalHistoryFlag: interviews.childMedicalHistoryFlag,
            childAllergyFlag: interviews.childAllergyFlag,
            citizenChildAllergy: interviews.citizenChildAllergy,
            allergyCauses1: interviews.allergyCauses1,
            allergySymptoms1: interviews.allergySymptoms1,
            allergyTreatments1: interviews.allergyTreatments1,
            allergyConcerns1: interviews.allergyConcerns1,
            allergyCauses2: interviews.allergyCauses2,
            allergySymptoms2: interviews.allergySymptoms2,
            allergyTreatments2: interviews.allergyTreatments2,
            allergyConcerns2: interviews.allergyConcerns2,
            allergyCauses3: interviews.allergyCauses3,
            allergySymptoms3: interviews.allergySymptoms3,
            allergyTreatments3: interviews.allergyTreatments3,
            allergyConcerns3: interviews.allergyConcerns3,
            brothersSistersFlag: interviews.brothersSistersFlag,
            multipleBirthsFlag: interviews.multipleBirthsFlag,
            disabilities: interviews.disabilities,
            note: interviews.note,
            interviewDate: interviews.interviewDate,
            permitFlag: interviews.permitFlag,
            reason: interviews.reason,
            facilityNumber: interviews.facilityNumber,
            birthHeight: interviews.birthHeight,
            birthWeight: interviews.birthWeight,
            normalTemperature: interviews.normalTemperature,
            medicalHistoryContent: interviews.medicalHistoryContent,
            healthPhysicalDevelopmentConcerns: interviews.healthPhysicalDevelopmentConcerns,
            familyHospital: interviews.familyHospital,
            familyHospitalTel: interviews.familyHospitalTel,
            bedTime: interviews.bedTime,
            wakeupTime: interviews.wakeupTime,
            napTime: interviews.napTime,
            napStartTime: interviews.napStartTime,
            napEndTime: interviews.napEndTime,
            putToSleep: interviews.putToSleep,
            fallAsleep: interviews.fallAsleep,
            excretion: interviews.excretion,
            leaveChildFlag: interviews.leaveChildFlag,
            leaveChildTo: interviews.leaveChildTo,
            userId: interviews.userId,
            childId: interviews.childId,
            createUser: interviews.createUser,
            createDatetime: interviews.createDatetime,
            updateUser: interviews.updateUser,
            updateDatetime: interviews.updateDatetime,
        };
    };
}

export interface UsersEntity extends Entity {
    userId: string;
    name: string;
    kana: string;
    tel: string;
    email: string;
    postalCode: string;
    address1: string;
    address2: string;
    buildingNameRoomNumber: string;
    relationship: string;
    emergencyContactName1: string;
    emergencyContactKana1: string;
    emergencyContactRelationship1: string;
    emergencyContactCompany1: string;
    emergencyContactTel1: string;
    emergencyContactEmail1: string;
    emergencyContactName2: string;
    emergencyContactKana2: string;
    emergencyContactRelationship2: string;
    emergencyContactCompany2: string;
    emergencyContactTel2: string;
    emergencyContactEmail2: string;
    emergencyContactName3: string;
    emergencyContactKana3: string;
    emergencyContactRelationship3: string;
    emergencyContactCompany3: string;
    emergencyContactTel3: string;
    emergencyContactEmail3: string;
    welfareHouseholdFlag: number;
    taxExemptHouseholdFlag: number;
    singleParentHouseholdFlag: number;
    multipleBirthsHouseholdFlag: number;
    deleteFlag: number;
    createUser: string;
    createDatetime: string;
    updateUser: string;
    updateDatetime: string;
};

export let basicUserEntity: UsersEntity = {
    userId: '814a3ff0-dae2-4f89-a6ec-29275f0cea5a',
    name: '?????? ?????????',
    kana: '????????? ?????????',
    tel: '080-3469-0696',
    email: 'slk.ty.yamaguchi+102@gmail.com',
    postalCode: '231-0005',
    address1: '?????????????????????????????????',
    address2: '????????????????????????',
    buildingNameRoomNumber: 'NULL',
    relationship: 'NULL',
    emergencyContactName1: 'NULL',
    emergencyContactKana1: 'NULL',
    emergencyContactRelationship1: 'NULL',
    emergencyContactCompany1: 'NULL',
    emergencyContactTel1: 'NULL',
    emergencyContactEmail1: 'NULL',
    emergencyContactName2: 'NULL',
    emergencyContactKana2: 'NULL',
    emergencyContactRelationship2: 'NULL',
    emergencyContactCompany2: 'NULL',
    emergencyContactTel2: 'NULL',
    emergencyContactEmail2: 'NULL',
    emergencyContactName3: 'NULL',
    emergencyContactKana3: 'NULL',
    emergencyContactRelationship3: 'NULL',
    emergencyContactCompany3: 'NULL',
    emergencyContactTel3: 'NULL',
    emergencyContactEmail3: 'NULL',
    welfareHouseholdFlag: 0,
    taxExemptHouseholdFlag: 0,
    singleParentHouseholdFlag: 0,
    multipleBirthsHouseholdFlag: 0,
    deleteFlag: 0,
    createUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    createDatetime: '2022-02-22 14:07:31.887',
    updateUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    updateDatetime: '2022-02-22 14:07:31.887'
};

export interface ChildrenEntity extends Entity {
    childId: string;
    userId: string;
    name: string;
    kana: string;
    birthday: string;
    registAge: string;
    gender: number;
    bloodType: string;
    allergyFlag: number;
    allergyCauses1: string;
    allergySymptoms1: string;
    allergyTreatments1: string;
    allergyConcerns1: string;
    allergyCauses2: string;
    allergySymptoms2: string;
    allergyTreatments2: string;
    allergyConcerns2: string;
    allergyCauses3: string;
    allergySymptoms3: string;
    allergyTreatments3: string;
    allergyConcerns3: string;
    brothersSistersFlag: number;
    multipleBirthsFlag: number;
    disabilities: number;
    childcareBusinessUserFlag: number;
    noChildcareProvidedFlag: number;
    limitApprovalFlag: number;
    deleteFlag: number;
    createUser: string;
    createDatetime: string;
    updateUser: string;
    updateDatetime: string;
};

export let basicChildrenEntity: ChildrenEntity = {
    childId: '01',
    userId: '814a3ff0-dae2-4f89-a6ec-29275f0cea5a',
    name: '?????? ??????',
    kana: '????????? ?????????',
    birthday: '2017-11-09',
    registAge: 'NULL',
    gender: 1,
    bloodType: 'A',
    allergyFlag: 0,
    allergyCauses1: 'NULL',
    allergySymptoms1: 'NULL',
    allergyTreatments1: 'NULL',
    allergyConcerns1: 'NULL',
    allergyCauses2: 'NULL',
    allergySymptoms2: 'NULL',
    allergyTreatments2: 'NULL',
    allergyConcerns2: 'NULL',
    allergyCauses3: 'NULL',
    allergySymptoms3: 'NULL',
    allergyTreatments3: 'NULL',
    allergyConcerns3: 'NULL',
    brothersSistersFlag: 0,
    multipleBirthsFlag: 0,
    disabilities: 0,
    childcareBusinessUserFlag: 0,
    noChildcareProvidedFlag: 0,
    limitApprovalFlag: 0,
    deleteFlag: 0,
    createUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    createDatetime: '2022-02-22 14:07:31.996',
    updateUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    updateDatetime: '2022-02-22 14:07:31.996'
};  

export interface InterviewsEntity extends Entity {
    interviewNo: string;
    facilityId: string;
    firstChoiceDate: string;
    firstChoiceTimeFrom: string;
    firstChoiceTimeTo: string;
    secondChoiceDate: string;
    secondChoiceTimeFrom: string;
    secondChoiceTimeTo: string;
    thirdChoiceDate: string;
    thirdChoiceTimeFrom: string;
    thirdChoiceTimeTo: string;
    reservationFixDate: string;
    reservationFixTimeFrom: string;
    reservationFixTimeTo: string;
    reservationMethod: number;
    reservationDatetime: string;
    status: number;
    parentName: string;
    parentKana: string;
    postalCode: string;
    address1: string;
    address2: string;
    buildingNameRoomNumber: string;
    tel: string;
    email: string;
    relationship: string;
    emergencyContactName1: string;
    emergencyContactKana1: string;
    emergencyContactRelationship1: string;
    emergencyContactCompany1: string;
    emergencyContactTel1: string;
    emergencyContactEmail1: string;
    emergencyContactName2: string;
    emergencyContactKana2: string;
    emergencyContactRelationship2: string;
    emergencyContactCompany2: string;
    emergencyContactTel2: string;
    emergencyContactEmail2: string;
    emergencyContactName3: string;
    emergencyContactKana3: string;
    emergencyContactRelationship3: string;
    emergencyContactCompany3: string;
    emergencyContactTel3: string;
    emergencyContactEmail3: string;
    welfareHouseholdFlag: number;
    taxExemptHouseholdFlag: number;
    singleParentHouseholdFlag: number;
    multipleBirthsHouseholdFlag: number;
    limitApprovalFlag: number;
    childcareBusinessUserFlag: number;
    noChildcareProvidedFlag: number;
    limitOverApprovalFlag: number;
    regularUseFlag: number;
    singleUseFlag: number;
    childName: string;
    childKana: string;
    childBirth: string;
    registAge: string;
    childGender: number;
    bloodType: string;
    childMedicalHistoryFlag: number;
    childAllergyFlag: number;
    citizenChildAllergy: string;
    allergyCauses1: string;
    allergySymptoms1: string;
    allergyTreatments1: string;
    allergyConcerns1: string;
    allergyCauses2: string;
    allergySymptoms2: string;
    allergyTreatments2: string;
    allergyConcerns2: string;
    allergyCauses3: string;
    allergySymptoms3: string;
    allergyTreatments3: string;
    allergyConcerns3: string;
    brothersSistersFlag: number;
    multipleBirthsFlag: number;
    disabilities: number;
    note: string;
    interviewDate: string;
    permitFlag: number;
    reason: string;
    facilityNumber: string;
    birthHeight: string;
    birthWeight: string;
    normalTemperature: string;
    medicalHistoryContent: string;
    healthPhysicalDevelopmentConcerns: string;
    familyHospital: string;
    familyHospitalTel: string;
    bedTime: string;
    wakeupTime: string;
    napTime: number;
    napStartTime: string;
    napEndTime: string;
    putToSleep: number;
    fallAsleep: number;
    excretion: number;
    leaveChildFlag: number;
    leaveChildTo: number;
    userId: string;
    childId: string;
    createUser: string;
    createDatetime: string;
    updateUser: string;
    updateDatetime: string;
  };

  export let basicInterviewsEntity: InterviewsEntity = {
    interviewNo: '173',
    facilityId: 'a00020',
    firstChoiceDate: '2020-06-29',
    firstChoiceTimeFrom: '16:00:00',
    firstChoiceTimeTo: '16:03:00',
    secondChoiceDate: 'NULL',
    secondChoiceTimeFrom: 'NULL',
    secondChoiceTimeTo: 'NULL',
    thirdChoiceDate: 'NULL',
    thirdChoiceTimeFrom: 'NULL',
    thirdChoiceTimeTo: 'NULL',
    reservationFixDate: '2020-06-29',
    reservationFixTimeFrom: '16:00:00',
    reservationFixTimeTo: '16:03:00',
    reservationMethod: 1,
    reservationDatetime: '2022-02-22 14:05:55',
    status: 2,
    parentName: '?????? ?????????',
    parentKana: '????????? ?????????',
    postalCode: '231-0005',
    address1: '?????????????????????????????????',
    address2: '????????????????????????',
    buildingNameRoomNumber: 'NULL',
    tel: '080-3469-0696',
    email: 'slk.ty.yamaguchi+102@gmail.com',
    relationship: 'NULL',
    emergencyContactName1: 'NULL',
    emergencyContactKana1: 'NULL',
    emergencyContactRelationship1: 'NULL',
    emergencyContactCompany1: 'NULL',
    emergencyContactTel1: 'NULL',
    emergencyContactEmail1: 'NULL',
    emergencyContactName2: 'NULL',
    emergencyContactKana2: 'NULL',
    emergencyContactRelationship2: 'NULL',
    emergencyContactCompany2: 'NULL',
    emergencyContactTel2: 'NULL',
    emergencyContactEmail2: 'NULL',
    emergencyContactName3: 'NULL',
    emergencyContactKana3: 'NULL',
    emergencyContactRelationship3: 'NULL',
    emergencyContactCompany3: 'NULL',
    emergencyContactTel3: 'NULL',
    emergencyContactEmail3: 'NULL',
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
    childName: '?????? ??????',
    childKana: '????????? ?????????',
    childBirth: '2017-11-09',
    registAge: 'NULL',
    childGender: 1,
    bloodType: 'A',
    childMedicalHistoryFlag: 0,
    childAllergyFlag: 0,
    citizenChildAllergy: 'NULL',
    allergyCauses1: 'NULL',
    allergySymptoms1: 'NULL',
    allergyTreatments1: 'NULL',
    allergyConcerns1: 'NULL',
    allergyCauses2: 'NULL',
    allergySymptoms2: 'NULL',
    allergyTreatments2: 'NULL',
    allergyConcerns2: 'NULL',
    allergyCauses3: 'NULL',
    allergySymptoms3: 'NULL',
    allergyTreatments3: 'NULL',
    allergyConcerns3: 'NULL',
    brothersSistersFlag: 0,
    multipleBirthsFlag: 0,
    disabilities: 0,
    note: 'NULL',
    interviewDate: '2022-02-21 11:00:00',
    permitFlag: 1,
    reason: 'NULL',
    facilityNumber: 'NULL',
    birthHeight: 'NULL',
    birthWeight: 'NULL',
    normalTemperature: 'NULL',
    medicalHistoryContent: 'NULL',
    healthPhysicalDevelopmentConcerns: 'NULL',
    familyHospital: 'NULL',
    familyHospitalTel: 'NULL',
    bedTime: 'NULL',
    wakeupTime: 'NULL',
    napTime: 0,
    napStartTime: 'NULL',
    napEndTime: 'NULL',
    putToSleep: 0,
    fallAsleep: 0,
    excretion: 0,
    leaveChildFlag: 0,
    leaveChildTo: 0,
    userId: '814a3ff0-dae2-4f89-a6ec-29275f0cea5a',
    childId: '01',
    createUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    createDatetime: '2022-02-22 14:05:55.134',
    updateUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    updateDatetime: '2022-02-22 14:07:32.192'
  };

  export interface ChildrenDetailEntity extends Entity {
    childId: string;
    userId: string;
    facilityId: string;
    facilityChildNumber: string;
    regularUseFlag: number;
    singleUseFlag: number;
    limitOverApprovalFlag: number;
    birthHeight: string;
    birthWeight: string;
    normalTemperature: string;
    medicalHistoryContent: string;
    healthPhysicalDevelopmentConcerns: string;
    familyHospital: string;
    familyHospitalTel: string;
    bedTime: string;
    wakeupTime: string;
    napTime: number;
    napStartTime: string;
    napEndTime: string;
    putToSleep: number;
    fallAsleep: number;
    excretion: number;
    leaveChildFlag: number;
    leaveChildTo: number;
    note: string;
    createUser: string;
    createDatetime: string;
    updateUser: string;
    updateDatetime: string;
  };
  
export let basicChildrenDetailEntity: ChildrenDetailEntity = 
{
    childId: '01',
    userId: 'd956567a-0228-4888-ac9b-cc242aa8bd8b',
    facilityId: 'a00020',
    facilityChildNumber: 'NULL',
    regularUseFlag: 0,
    singleUseFlag: 0,
    limitOverApprovalFlag: 0,
    birthHeight: 'NULL',
    birthWeight: 'NULL',
    normalTemperature: 'NULL',
    medicalHistoryContent: 'NULL',
    healthPhysicalDevelopmentConcerns: 'NULL',
    familyHospital: 'NULL',
    familyHospitalTel: 'NULL',
    bedTime: 'NULL',
    wakeupTime: 'NULL',
    napTime: 0,
    napStartTime: 'NULL',
    napEndTime: 'NULL',
    putToSleep: 0,
    fallAsleep: 0,
    excretion: 0,
    leaveChildFlag: 0,
    leaveChildTo: 0,
    note: 'NULL',
    createUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    createDatetime: '2022-02-22 14:07:32.108',
    updateUser: 'f8dc737e-28d6-424d-9d88-6bb1ee1efc40',
    updateDatetime: '2022-02-22 14:07:32.108'
}

export interface MendanTarget extends Entity {
    target_date: string;
}
