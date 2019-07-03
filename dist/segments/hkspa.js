"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HKSPAProps {
}
exports.HKSPAProps = HKSPAProps;
/**
 * HKSPA (SEPA-Kontoverbindung anfordern)
 * Section C.10.1.3
 */
class HKSPA extends segment_1.SegmentClass(HKSPAProps) {
    constructor() {
        super(...arguments);
        this.type = "HKSPA";
    }
    defaults() {
        this.version = 1;
    }
    serialize() {
        const { accNo, subAccFeature, blz } = this;
        return accNo ? [
            format_1.Format.num(accNo),
            subAccFeature,
            format_1.Format.num(constants_1.COUNTRY_CODE),
            blz,
        ] : [];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKSPA = HKSPA;
//# sourceMappingURL=hkspa.js.map