"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewNoMaker = exports.MailAdressMaker = exports.UserIdMaker = void 0;
/* @deprecated */
var UserIdMaker = /** @class */ (function () {
    function UserIdMaker(userids) {
        this.userids = userids;
        this.index = 0;
    }
    UserIdMaker.prototype.createNewUserId = function () {
        return this.userids[this.index++];
    };
    return UserIdMaker;
}());
exports.UserIdMaker = UserIdMaker;
var MailAdressMaker = /** @class */ (function () {
    function MailAdressMaker(prefix, suffix, startIndex) {
        this.prefix = prefix;
        this.suffix = suffix;
        this.startIndex = startIndex;
    }
    MailAdressMaker.prototype.createNewId = function () {
        return this.prefix + "+" + new String(this.startIndex++) + "@" + this.suffix;
    };
    return MailAdressMaker;
}());
exports.MailAdressMaker = MailAdressMaker;
var InterviewNoMaker = /** @class */ (function () {
    function InterviewNoMaker(startIndex) {
        this.startIndex = startIndex;
    }
    InterviewNoMaker.prototype.createNewNo = function () {
        return this.startIndex++;
    };
    ;
    return InterviewNoMaker;
}());
exports.InterviewNoMaker = InterviewNoMaker;
