"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const parse_1 = require("../parse");
class HIKAZSProps {
}
exports.HIKAZSProps = HIKAZSProps;
/**
 * HIKAZS (Kontoumsätze/Zeitraum Parameter)
 * Section C.2.1.1.1.1
 */
class HIKAZS extends segment_1.SegmentClass(HIKAZSProps) {
    constructor() {
        super(...arguments);
        this.type = "HIKAZS";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[maxRequestCount], [minSignatures]] = input;
        this.minSignatures = parse_1.Parse.num(minSignatures);
        this.maxRequestCount = parse_1.Parse.num(maxRequestCount);
    }
}
exports.HIKAZS = HIKAZS;
//# sourceMappingURL=hikazs.js.map