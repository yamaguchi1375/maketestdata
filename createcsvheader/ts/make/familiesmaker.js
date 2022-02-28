"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamillesMaker = exports.FamillesMakerParam = exports.FamilyMakerType = void 0;
var familymaker_1 = require("./familymaker");
var FamilyMakerType = /** @class */ (function () {
    function FamilyMakerType(pettern, count) {
        this.pettern = pettern;
        this.count = count;
    }
    return FamilyMakerType;
}());
exports.FamilyMakerType = FamilyMakerType;
var FamillesMakerParam = /** @class */ (function () {
    function FamillesMakerParam(facilityId) {
        this.facilityId = facilityId;
        this.types = [];
    }
    FamillesMakerParam.prototype.pushPettern = function (makerType) {
        this.types.push(makerType);
    };
    ;
    return FamillesMakerParam;
}());
exports.FamillesMakerParam = FamillesMakerParam;
;
var FamillesMaker = /** @class */ (function () {
    function FamillesMaker(jyusyoMaster, personMaster, userIdMaster, interviewNoMaker) {
        this.jyusyoMaster = jyusyoMaster;
        this.presonMaster = personMaster;
        this.userIdMaster = userIdMaster;
        this.interviewNoMaker = interviewNoMaker;
        this.users = [];
        this.childrens = [];
        this.interviews = [];
    }
    ;
    FamillesMaker.prototype.make = function (params) {
        var _this = this;
        var familles = [];
        var index = 0;
        params.types.forEach(function (makerType) {
            for (var i = 0; i < makerType.count; i++) {
                var userId = _this.userIdMaster.getNewUserId();
                var maker = new familymaker_1.FamilyMaker(++index, makerType.pettern, userId.user_id, params.facilityId, _this.interviewNoMaker, userId.mail, _this.jyusyoMaster, _this.presonMaster);
                familles.push(maker.make());
            }
        });
        return familles;
    };
    ;
    return FamillesMaker;
}());
exports.FamillesMaker = FamillesMaker;
