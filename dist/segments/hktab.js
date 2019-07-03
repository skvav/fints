"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const format_1 = require("../format");
class HKTABProps {
}
exports.HKTABProps = HKTABProps;
/**
 * HKTAB (Verfügbare TAN-Medien ermitteln)
 * Section C.2.1.2
 */
class HKTAB extends segment_1.SegmentClass(HKTABProps) {
    constructor() {
        super(...arguments);
        this.type = "HKTAB";
    }
    defaults() {
        this.version = 5;
        this.tanClass = "A";
        this.mode = 0;
    }
    serialize() {
        return [format_1.Format.num(this.mode), this.tanClass];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKTAB = HKTAB;
//# sourceMappingURL=hktab.js.map