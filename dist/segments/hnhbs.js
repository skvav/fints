"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const format_1 = require("../format");
class HNHBSProps {
}
exports.HNHBSProps = HNHBSProps;
/**
 * HNHBS (Nachrichtenabschluss)
 * Section B.5.3
 */
class HNHBS extends segment_1.SegmentClass(HNHBSProps) {
    constructor() {
        super(...arguments);
        this.type = "HNHBS";
    }
    defaults() {
        this.version = 1;
    }
    serialize() {
        return [format_1.Format.num(this.msgNo)];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HNHBS = HNHBS;
//# sourceMappingURL=hnhbs.js.map