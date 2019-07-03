"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const parse_1 = require("../parse");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HNVSKProps {
}
exports.HNVSKProps = HNVSKProps;
class HNVSK extends segment_1.SegmentClass(HNVSKProps) {
    constructor() {
        super(...arguments);
        this.type = "HNVSK";
    }
    defaults() {
        this.version = 3;
    }
    serialize() {
        const { blz, name, systemId, profileVersion } = this;
        return [
            ["PIN", format_1.Format.num(profileVersion)],
            format_1.Format.num(998),
            format_1.Format.num(constants_1.SECURITY_SUPPLIER_ROLE),
            [format_1.Format.num(1), format_1.Format.empty(), systemId],
            [format_1.Format.num(1), format_1.Format.date(), format_1.Format.time()],
            [
                format_1.Format.num(2),
                format_1.Format.num(2),
                format_1.Format.num(13),
                format_1.Format.stringWithLength("00000000"),
                format_1.Format.num(5),
                format_1.Format.num(1),
            ],
            [format_1.Format.num(constants_1.COUNTRY_CODE), blz, name, "S", format_1.Format.num(0), format_1.Format.num(0)],
            format_1.Format.num(constants_1.COMPRESSION_NONE),
        ];
    }
    deserialize(input) {
        const [[profile, profileVersion]] = input;
        if (profile !== "PIN") {
            throw new Error(`Unsupported profile: ${profile}`);
        }
        this.profileVersion = parse_1.Parse.num(profileVersion);
        this.systemId = input[3][2];
        this.name = input[6][2];
        this.blz = input[6][1];
    }
}
exports.HNVSK = HNVSK;
//# sourceMappingURL=hnvsk.js.map