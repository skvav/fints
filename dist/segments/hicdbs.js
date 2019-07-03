"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const parse_1 = require("../parse");
class HICDBSProps {
}
exports.HICDBSProps = HICDBSProps;
/**
 * HICDBS (SEPA-Dauerauftragsbestand Parameter)
 * Section C.10.2.3.4
 */
class HICDBS extends segment_1.SegmentClass(HICDBSProps) {
    constructor() {
        super(...arguments);
        this.type = "HICDBS";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[maxRequestCount], [minSignatures]] = input;
        this.minSignatures = parse_1.Parse.num(minSignatures);
        this.maxRequestCount = parse_1.Parse.num(maxRequestCount);
    }
}
exports.HICDBS = HICDBS;
//# sourceMappingURL=hicdbs.js.map