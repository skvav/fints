"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class HKENDProps {
}
exports.HKENDProps = HKENDProps;
class HKEND extends segment_1.SegmentClass(HKENDProps) {
    constructor() {
        super(...arguments);
        this.type = "HKEND";
    }
    defaults() {
        this.version = 1;
    }
    serialize() {
        return [this.dialogId];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKEND = HKEND;
//# sourceMappingURL=hkend.js.map