"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPReasonSupplementer = void 0;
var SPReasonSupplementer = /** @class */ (function () {
    function SPReasonSupplementer(familes) {
        this.familes = familes;
    }
    SPReasonSupplementer.prototype.supplement = function () {
        var alreadyTargets = Array();
        // for user
        // 被保護世帯 welfareHouseholdFlag = 1                3
        this.familes[3].user.welfareHouseholdFlag = 1;
        this.familes[3].interviews.forEach(function (e) { e.welfareHouseholdFlag = 1; });
        // 非課税世帯 taxExemptHouseholdFlag = 1              4
        this.familes[4].user.taxExemptHouseholdFlag = 1;
        this.familes[4].interviews.forEach(function (e) { e.taxExemptHouseholdFlag = 1; });
        // ひとり親世帯 singleParentHouseholdFlag = 1         5
        this.familes[5].user.singleParentHouseholdFlag = 1;
        this.familes[5].interviews.forEach(function (e) { e.singleParentHouseholdFlag = 1; });
        // for child
        // 障害有無 0:無 1:A区分：重度 2:B区分：中度 3: C区分：軽度 disabilities = 1 or 2 or 3    6
        this.familes[6].childrens[0].disabilities = 1;
        this.familes[6].interviews[0].disabilities = 1;
        // 障害有無 0:無 1:A区分：重度 2:B区分：中度 3: C区分：軽度 disabilities = 1 or 2 or 3    7
        this.familes[7].childrens[0].disabilities = 2;
        this.familes[7].interviews[0].disabilities = 2;
        // 障害有無 0:無 1:A区分：重度 2:B区分：中度 3: C区分：軽度 disabilities = 1 or 2 or 3    8
        this.familes[7].childrens[0].disabilities = 2;
        this.familes[7].interviews[0].disabilities = 2;
        // 利用限度了承フラグ limitApprovalFlag = 1                                           9
        this.familes[9].childrens[0].limitApprovalFlag = 1;
        this.familes[9].interviews[0].limitApprovalFlag = 1;
        // 家庭的保育事業利用者 childcareBusinessUserFlag = 1                                 10
        this.familes[10].childrens[0].childcareBusinessUserFlag = 1;
        this.familes[10].interviews[0].childcareBusinessUserFlag = 1;
        // 保育の提供を受けることができない noChildcareProvidedFlag = 1                         11
        this.familes[11].childrens[0].noChildcareProvidedFlag = 1;
        this.familes[11].interviews[0].noChildcareProvidedFlag = 1;
        // for child detail
        // 定期フラグ regularUseFlag = 1                                                     12
        this.familes[12].childrendetails[0].limitOverApprovalFlag = 1;
        this.familes[12].interviews[0].limitOverApprovalFlag = 1;
        // 単発フラグ singleUseFlag = 1                                                      13
        this.familes[13].childrendetails[0].limitOverApprovalFlag = 1;
        this.familes[13].interviews[0].limitOverApprovalFlag = 1;
        // 超過了承済みフラグ limitOverApprovalFlag = 1                                        14
        this.familes[14].childrendetails[0].limitOverApprovalFlag = 1;
        this.familes[14].interviews[0].limitOverApprovalFlag = 1;
        // for child 8 人くらい 5,11,17,23,29,35,41,47
        // アレルギー allergy_flg = 1                                                                                                                
        // アレルギー１の原因 allergy_causes1 = 食物アレルギー（卵、甲殻類）                               
        // アレルギー１の症状 allergy_symptoms1 = アトピー性皮膚炎による
        // アレルギー１の処置 allergy_treatments1 = ステロイド軟膏の塗布                          
        // アレルギー1の気をつけること allergy_concerns1 = お菓子に少量含まれていても反応するため気をつけてください。
        var index = 0;
        this.familes.forEach(function (f) {
            f.childrens.forEach(function (c) {
                index++;
                if ((index % 6) == 0) {
                    c.allergyFlag = 1;
                    c.allergyCauses1 = '食物アレルギー（卵、甲殻類）';
                    c.allergySymptoms1 = 'アトピー性皮膚炎による';
                    c.allergyTreatments1 = 'ステロイド軟膏の塗布';
                    c.allergyConcerns1 = 'お菓子に少量含まれていても反応するため気をつけてください。';
                }
            });
        });
        this.familes.forEach(function (f) {
            f.interviews.forEach(function (c) {
                index++;
                if ((index % 6) == 0) {
                    c.childAllergyFlag = 1;
                    c.allergyCauses1 = '食物アレルギー（卵、甲殻類）';
                    c.allergySymptoms1 = 'アトピー性皮膚炎による';
                    c.allergyTreatments1 = 'ステロイド軟膏の塗布';
                    c.allergyConcerns1 = 'お菓子に少量含まれていても反応するため気をつけてください。';
                }
            });
        });
    };
    return SPReasonSupplementer;
}());
exports.SPReasonSupplementer = SPReasonSupplementer;
