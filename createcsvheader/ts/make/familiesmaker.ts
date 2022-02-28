import { Children, Family, Interviews, Users } from "../dto/dtos";
import { JyusyoMaster } from "../master/jyusyomst";
import { PersonMaster } from "../master/psersonmst";
import { UserIdMaster } from "../master/useridmst";
import { FamilyMaker, FamilyPattern } from "./familymaker";
import { InterviewNoMaker, MailAdressMaker, UserIdMaker } from "./idmanagement";

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
    userIdMaster: UserIdMaster
    interviewNoMaker: InterviewNoMaker;
    users: Array<Users>;
    childrens: Array<Children>;
    interviews: Array<Interviews>;
    constructor(jyusyoMaster: JyusyoMaster, personMaster: PersonMaster, userIdMaster: UserIdMaster
        , interviewNoMaker: InterviewNoMaker) {
        this.jyusyoMaster = jyusyoMaster;
        this.presonMaster = personMaster;
        this.userIdMaster = userIdMaster;
        this.interviewNoMaker = interviewNoMaker;
        this.users = [];
        this.childrens = [];
        this.interviews = [];
    };
    make(params: FamillesMakerParam): Array<Family> {
        const familles: Array<Family> = [];
        let index = 0;
        params.types.forEach(makerType => {
            for (let i = 0; i < makerType.count; i++) {
                let userId = this.userIdMaster.getNewUserId();
                const maker = new FamilyMaker(
                    ++index,
                    makerType.pettern,
                    userId.user_id,
                    params.facilityId,
                    this.interviewNoMaker,
                    userId.mail,
                    this.jyusyoMaster,
                    this.presonMaster
                );
                familles.push(maker.make());
            }
        });
        return familles;
    };
}
