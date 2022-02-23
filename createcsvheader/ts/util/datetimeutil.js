"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.getRandomYmd = function (fromYmd, toYmd) {
        var d1 = new Date(fromYmd);
        var d2 = new Date(toYmd);
        var c = (d2 - d1) / 86400000;
        var x = Math.floor(Math.random() * (c + 1));
        d1.setDate(d1.getDate() + x);
        //フォーマット整形
        var y = d1.getFullYear();
        var m = ("00" + (d1.getMonth() + 1)).slice(-2);
        var d = ("00" + d1.getDate()).slice(-2);
        return y + "/" + m + "/" + d;
    };
    ;
    DateUtil.getRandomTime = function (starthour, endhour) {
        var timenum = Math.floor(Math.random() * (endhour + 1 - starthour)) + starthour;
        return timenum * 100;
    };
    ;
    DateUtil.getRandomChoiceDate = function (birthday) {
        return DateUtil.getRandomYmd(birthday, '2022/02/15');
    };
    ;
    DateUtil.getRandomChoiceTime = function () {
        return DateUtil.getRandomTime(10, 17) + ":00:00";
    };
    ;
    return DateUtil;
}());
exports.DateUtil = DateUtil;
