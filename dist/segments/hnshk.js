"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const format_1 = require("../format");
const constants_1 = require("../constants");
class HNSHKProps {
}
exports.HNSHKProps = HNSHKProps;
/**
 * HNSHK (Signaturkopf)
 * Section B.5.1
 */
class HNSHK extends segment_1.SegmentClass(HNSHKProps) {
    constructor() {
        super(...arguments);
        this.type = "HNSHK";
    }
    defaults() {
        this.version = 4;
        this.securityFunction = constants_1.SECURITY_FUNCTION;
    }
    serialize() {
        const { secRef, blz, name, systemId, profileVersion, securityFunction } = this;
        return [
            ["PIN", format_1.Format.num(profileVersion)],
            securityFunction,
            format_1.Format.num(secRef),
            format_1.Format.num(constants_1.SECURITY_BOUNDARY),
            format_1.Format.num(constants_1.SECURITY_SUPPLIER_ROLE),
            [format_1.Format.num(1), format_1.Format.empty(), systemId],
            format_1.Format.num(1),
            [format_1.Format.num(1), format_1.Format.date(), format_1.Format.time()],
            [format_1.Format.num(1), format_1.Format.num(999), format_1.Format.num(1)],
            [format_1.Format.num(6), format_1.Format.num(10), format_1.Format.num(16)],
            [format_1.Format.num(constants_1.COUNTRY_CODE), blz, name, "S", format_1.Format.num(0), format_1.Format.num(0)],
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HNSHK = HNSHK;
//# sourceMappingURL=hnshk.js.map