"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const parse_1 = require("../parse");
class HISALSProps {
}
exports.HISALSProps = HISALSProps;
/**
 * HISALS (Saldenabfrage Parameter)
 * Section C.2.1.2
 */
class HISALS extends segment_1.SegmentClass(HISALSProps) {
    constructor() {
        super(...arguments);
        this.type = "HISALS";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[maxRequestCount], [minSignatures]] = input;
        this.minSignatures = parse_1.Parse.num(minSignatures);
        this.maxRequestCount = parse_1.Parse.num(maxRequestCount);
    }
}
exports.HISALS = HISALS;
//# sourceMappingURL=hisals.js.map