"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MendanMaker = void 0;
var MendanMaker = /** @class */ (function () {
    function MendanMaker(targetDays, interviews) {
        this.targetDays = targetDays;
        this.interviews = interviews;
    }
    MendanMaker.prototype.make = function () {
        if (this.targetDays.length != this.interviews.length) {
            // TODO 一人っ子以外への対応
            throw Error('not suppport same index targetDays & interviews');
        }
        for (var i = 0; i < this.interviews.length; i++) {
            var interview = this.interviews[i];
            var date = this.targetDays[i];
            var noFix = i % 4;
            if (noFix != 0) {
                interview.reservationFixDate = date.target_date;
                interview.firstChoiceDate = date.target_date;
                interview.permitFlag = 2;
                interview.status = 1;
                interview.interviewDate = 'NULL';
            }
            else {
                interview.reservationFixDate = 'NULL';
                interview.reservationFixTimeFrom = 'NULL';
                interview.reservationFixTimeTo = 'NULL';
                interview.firstChoiceDate = date.target_date;
                interview.permitFlag = 2;
                interview.status = 0;
                interview.interviewDate = 'NULL';
            }
        }
    };
    return MendanMaker;
}());
exports.MendanMaker = MendanMaker;
