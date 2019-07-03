"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
exports.tanMethodArgumentMap = new Map();
exports.tanMethodArgumentMap.set(1, [
    "securityFunction",
    "tanProcess",
    "techId",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
]);
exports.tanMethodArgumentMap.set(2, [
    "securityFunction",
    "tanProcess",
    "techId",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "challengeClassRequired",
    "challengeValueRequired",
]);
exports.tanMethodArgumentMap.set(3, [
    "securityFunction",
    "tanProcess",
    "techId",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "challengeClassRequired",
    "challengeValueRequired",
    "initializationMode",
    "descriptionRequired",
    "supportedMediaNumber",
]);
exports.tanMethodArgumentMap.set(4, [
    "securityFunction",
    "tanProcess",
    "techId",
    "zkaId",
    "zkaVersion",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "smsChargeAccountRequired",
    "challengeClassRequired",
    "challengeValueRequired",
    "challengeStructured",
    "initializationMode",
    "descriptionRequired",
    "supportedMediaNumber",
]);
exports.tanMethodArgumentMap.set(5, [
    "securityFunction",
    "tanProcess",
    "techId",
    "zkaId",
    "zkaVersion",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "numberOfSupportedLists",
    "multiple",
    "tanTimeDialogAssociation",
    "tanListNumberRequired",
    "cancellable",
    "smsChargeAccountRequired",
    "principalAccountRequired",
    "challengeClassRequired",
    "challengeValueRequired",
    "initializationMode",
    "descriptionRequired",
    "supportedMediaNumber",
]);
exports.tanMethodArgumentMap.set(6, [
    "securityFunction",
    "tanProcess",
    "techId",
    "zkaId",
    "zkaVersion",
    "name",
    "maxLengthInput",
    "allowedFormat",
    "textReturnvalue",
    "maxLengthReturnvalue",
    "multiple",
    "tanTimeDialogAssociation",
    "cancellable",
    "smsChargeAccountRequired",
    "principalAccountRequired",
    "challengeClassRequired",
    "challengeStructured",
    "initializationMode",
    "descriptionRequired",
    "hhdUcRequired",
    "supportedMediaNumber",
]);
class TanMethod {
    constructor(version, config) {
        this.version = version;
        const argumentList = exports.tanMethodArgumentMap.get(version);
        const map = argumentList.reduce((result, argumentName, index) => {
            result.set(argumentName, config[index]);
            return result;
        }, new Map());
        this.allowedFormat = map.get("allowedFormat");
        this.cancellable = parse_1.Parse.bool(map.get("cancellable"));
        this.challengeClassRequired = parse_1.Parse.bool(map.get("challengeClassRequired"));
        this.challengeValueRequired = parse_1.Parse.bool(map.get("challengeValueRequired"));
        this.challengeStructured = parse_1.Parse.bool(map.get("challengeStructured"));
        this.descriptionRequired = map.get("descriptionRequired");
        this.hhdUcRequired = parse_1.Parse.bool(map.get("hhdUcRequired"));
        this.initializationMode = map.get("initializationMode");
        this.maxLengthInput = parse_1.Parse.num(map.get("maxLengthInput"));
        this.maxLengthReturnvalue = parse_1.Parse.num(map.get("maxLengthReturnvalue"));
        this.multiple = parse_1.Parse.bool(map.get("multiple"));
        this.name = map.get("name");
        this.numberOfSupportedLists = parse_1.Parse.num(map.get("numberOfSupportedLists"));
        this.principalAccountRequired = map.get("principalAccountRequired") === "2";
        this.securityFunction = map.get("securityFunction");
        this.smsChargeAccountRequired = map.get("smsChargeAccountRequired") === "1";
        this.supportedMediaNumber = parse_1.Parse.num(map.get("supportedMediaNumber"));
        this.tanListNumberRequired = parse_1.Parse.bool(map.get("tanListNumberRequired"));
        this.tanProcess = map.get("tanProcess");
        this.tanTimeDialogAssociation = map.get("tanTimeDialogAssociation");
        this.techId = map.get("techId");
        this.textReturnvalue = map.get("textReturnvalue");
        this.zkaId = map.get("zkaId");
        this.zkaVersion = map.get("zkaVersion");
    }
}
exports.TanMethod = TanMethod;
//# sourceMappingURL=tan-method.js.map