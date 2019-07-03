"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../parse");
const segment_1 = require("./segment");
class HIBPAProps {
}
exports.HIBPAProps = HIBPAProps;
/**
 * HIBPA (Bankparameter allgemein)
 * Section D.2
 */
class HIBPA extends segment_1.SegmentClass(HIBPAProps) {
    constructor() {
        super(...arguments);
        this.type = "HIBPA";
    }
    defaults() {
        this.version = 3;
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[bpdVersion], [countryCode, blz], [bankName], [transactionTypeCount], supportedLanguages, supportedHbciVersions,] = input;
        this.bpdVersion = parse_1.Parse.num(bpdVersion);
        this.countryCode = parse_1.Parse.num(countryCode);
        this.blz = blz;
        this.bankName = bankName;
        this.transactionTypeCount = parse_1.Parse.num(transactionTypeCount);
        this.supportedLanguages = supportedLanguages.map(parse_1.Parse.num);
        this.supportedHbciVersions = supportedHbciVersions.map(parse_1.Parse.num);
    }
}
exports.HIBPA = HIBPA;
//# sourceMappingURL=hibpa.js.map