"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const segment_1 = require("./segment");
class HKCDBProps {
}
exports.HKCDBProps = HKCDBProps;
/**
 * HKCDB (SEPA-Dauerauftragsbestand abrufen)
 * Section C.10.2.3.4
 */
class HKCDB extends segment_1.SegmentClass(HKCDBProps) {
    constructor() {
        super(...arguments);
        this.type = "HKCDB";
    }
    serialize() {
        const { account, touchdown, painFormats } = this;
        const { iban, bic } = account;
        const pain0101 = painFormats.find(x => x.startsWith("urn") && x.indexOf("pain.001.001.03") !== -1);
        const pain0103 = painFormats.find(x => x.startsWith("urn") && x.indexOf("pain.001.003.03") !== -1);
        return [
            [iban, bic],
            pain0101 || pain0103,
            format_1.Format.empty(),
            format_1.Format.empty(),
            format_1.Format.stringEscaped(touchdown),
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKCDB = HKCDB;
//# sourceMappingURL=hkcdb.js.map