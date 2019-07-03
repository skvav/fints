"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const utils_1 = require("../utils");
const segment_1 = require("./segment");
class HNVSDProps {
}
exports.HNVSDProps = HNVSDProps;
/**
 * HNVSD (Verschlüsselte Daten)
 * Section B.5.4
 */
class HNVSD extends segment_1.SegmentClass(HNVSDProps) {
    constructor() {
        super(...arguments);
        this.type = "HNVSD";
    }
    defaults() {
        this.version = 1;
    }
    serialize() {
        return [
            format_1.Format.stringWithLength(this.segments
                .map(segment => String(segment))
                .join("")),
        ];
    }
    deserialize(input) {
        const [[content]] = input;
        this.rawSegments = utils_1.parse(content);
    }
}
exports.HNVSD = HNVSD;
//# sourceMappingURL=hnvsd.js.map