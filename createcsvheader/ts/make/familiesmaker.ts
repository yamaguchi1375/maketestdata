import { Children, Family, Interviews, Users } from "../dto/dtos";
import { JyusyoMaster } from "../master/jyusyomst";
import { PersonMaster } from "../master/psersonmst";
import { FamilyMaker, FamilyPattern } from "./familymaker";
import { ChildIdMaker, InterviewNoMaker, MailAdressMaker, UserIdMaker } from "./idmanagement";

export class FamilyMakerType {
    pettern: FamilyPattern;
    count: number;
    constructor(pettern: FamilyPattern, count: number) {
        this.pettern = pettern;
        this.count = count;
    }
}

export class FamillesMakerParam {
    facilityId: string;
    types: Array<FamilyMakerType>;
    constructor(facilityId: string) {
        this.facilityId = facilityId;
        this.types = [];
    }
    pushPettern(makerType: FamilyMakerType) {
        this.types.push(makerType);
    };
};

export class FamillesMaker {
    jyusyoMaster: JyusyoMaster;
    presonMaster: PersonMaster;
    userIdMaker: UserIdMaker;
    childIdMaker: ChildIdMaker;
    interviewNoMaker: InterviewNoMaker;
    mailAdressMaker: MailAdressMaker; 
    users: Array<Users>;
    childrens: Array<Children>;
    interviews: Array<Interviews>;
    constructor(jyusyoMaster: JyusyoMaster, personMaster: PersonMaster
        , userIdMaker: UserIdMaker, childIdMaker: ChildIdMaker
        , interviewNoMaker: InterviewNoMaker,mailAdressMaker : MailAdressMaker) {
        this.jyusyoMaster = jyusyoMaster;
        this.presonMaster = personMaster;
        this.userIdMaker = userIdMaker;
        this.childIdMaker = childIdMaker;
        this.interviewNoMaker = interviewNoMaker;
        this.mailAdressMaker = mailAdressMaker;
        this.users = [];
        this.childrens = [];
        this.interviews = [];
    };
    make(params: FamillesMakerParam): Array<Family> {
        const familles: Array<Family> = [];
        let index = 0;
        params.types.forEach(makerType => {
            for (let i = 0; i < makerType.count; i++) {
                const maker = new FamilyMaker(
                    ++index,
                    makerType.pettern,
                    this.userIdMaker.createNewId(),
                    params.facilityId,
                    this.childIdMaker,
                    this.interviewNoMaker,
                    this.mailAdressMaker.createNewId(),
                    this.jyusyoMaster,
                    this.presonMaster
                );
                familles.push(maker.make());
            }
        });
        return familles;
    };
}
