import { ChildrenDetailEntity, ChildrenEntity, InterviewsEntity, UsersEntity } from "./entity";

export interface Jyusyo {
    yubin7: string;
    jyusyo: string;
    jyusyo2: string;
    index: number;
};

export interface Person {
    name: string;
    kana: string;
    lastName: string;
    firstName: string;
    lastKana: string;
    firstKana: string;
    gender: number;
    age: string;
    birthday: string;
    bloodType: string;
    cellPhoneNumber: string;
    relationship: string;
    index: number;
};

export interface Children extends ChildrenEntity {
    person: Person;
};
  
export interface Interviews extends InterviewsEntity {
    title: string;
};
    
export interface Reductions {
    userId: string;
    singleParentFlag: string;
    taxExemptFlag: string;
    startDate: string;
    endDate: string;
};

export interface Users extends UsersEntity {
    person: Person;
  };
    
export interface Family {
    user: Users;
    childrens: Array<Children>;
    childrendetails: Array<ChildrenDetailEntity>;
    interviews: Array<Interviews>;
};

export interface CalendarMst {
    month: number,
    date: string,
    holiday: number
}
