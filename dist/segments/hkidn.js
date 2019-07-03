"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HKIDNProps {
}
exports.HKIDNProps = HKIDNProps;
/**
 * HKIDN (Identifikation)
 * Section C.3.1.2
 */
class HKIDN extends segment_1.SegmentClass(HKIDNProps) {
    constructor() {
        super(...arguments);
        this.type = "HKIDN";
    }
    defaults() {
        this.version = 2;
        this.systemId = "0";
        this.customerId = 1;
    }
    serialize() {
        const { blz, name, systemId, customerId } = this;
        return [
            [format_1.Format.num(constants_1.COUNTRY_CODE), blz],
            format_1.Format.stringEscaped(name),
            systemId,
            format_1.Format.num(customerId),
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKIDN = HKIDN;
//# sourceMappingURL=hkidn.js.map