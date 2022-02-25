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
    function FamillesMaker(jyusyoMaster, personMaster, userIdMaker, interviewNoMaker, mailAdressMaker) {
        this.jyusyoMaster = jyusyoMaster;
        this.presonMaster = personMaster;
        this.userIdMaker = userIdMaker;
        this.interviewNoMaker = interviewNoMaker;
        this.mailAdressMaker = mailAdressMaker;
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
                var maker = new familymaker_1.FamilyMaker(++index, makerType.pettern, _this.userIdMaker.createNewId(), params.facilityId, _this.interviewNoMaker, _this.mailAdressMaker.createNewId(), _this.jyusyoMaster, _this.presonMaster);
                familles.push(maker.make());
            }
        });
        return familles;
    };
    ;
    return FamillesMaker;
}());
exports.FamillesMaker = FamillesMaker;
