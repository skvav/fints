"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const format_1 = require("../format");
class HNSHAProps {
}
exports.HNSHAProps = HNSHAProps;
/**
 * HNSHA (Signaturabschluss)
 * Section B.5.2
 */
class HNSHA extends segment_1.SegmentClass(HNSHAProps) {
    constructor() {
        super(...arguments);
        this.type = "HNSHA";
    }
    defaults() {
        this.version = 2;
    }
    serialize() {
        const { secRef, pin, tan } = this;
        return [
            format_1.Format.num(secRef),
            format_1.Format.empty(),
            tan ? [pin, tan] : pin,
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HNSHA = HNSHA;
//# sourceMappingURL=hnsha.js.map