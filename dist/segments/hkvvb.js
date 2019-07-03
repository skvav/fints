"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HKVVBProps {
}
exports.HKVVBProps = HKVVBProps;
/**
 * HKVVB (Verarbeitungsvorbereitung)
 * Section C.3.1.3
 */
class HKVVB extends segment_1.SegmentClass(HKVVBProps) {
    constructor() {
        super(...arguments);
        this.type = "HKVVB";
    }
    defaults() {
        this.version = 3;
        this.lang = constants_1.LANG_DE;
    }
    serialize() {
        const { lang } = this;
        return [
            format_1.Format.num(0),
            format_1.Format.num(0),
            format_1.Format.num(lang),
            format_1.Format.stringEscaped(constants_1.PRODUCT_NAME),
            format_1.Format.stringEscaped(constants_1.PRODUCT_VERSION),
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKVVB = HKVVB;
//# sourceMappingURL=hkvvb.js.map