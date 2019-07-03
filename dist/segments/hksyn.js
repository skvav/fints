"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const format_1 = require("../format");
const segment_1 = require("./segment");
class HKSYNProps {
}
exports.HKSYNProps = HKSYNProps;
/**
 * HKSYN (Synchronisation)
 * Section C.8.1.2
 */
class HKSYN extends segment_1.SegmentClass(HKSYNProps) {
    constructor() {
        super(...arguments);
        this.type = "HKSYN";
    }
    defaults() {
        this.version = 3;
        this.mode = constants_1.SYNC_MODE_NEW_CUSTOMER_ID;
    }
    serialize() {
        return [format_1.Format.num(this.mode)];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKSYN = HKSYN;
//# sourceMappingURL=hksyn.js.map