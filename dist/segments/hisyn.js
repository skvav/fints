"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class HISYNProps {
}
exports.HISYNProps = HISYNProps;
/**
 * HISYN (Synchronisierungsantwort)
 * Section C.8.2.2
 */
class HISYN extends segment_1.SegmentClass(HISYNProps) {
    constructor() {
        super(...arguments);
        this.type = "HISYN";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[systemId]] = input;
        this.systemId = systemId;
    }
}
exports.HISYN = HISYN;
//# sourceMappingURL=hisyn.js.map