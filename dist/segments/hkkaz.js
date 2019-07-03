"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HKKAZProps {
}
exports.HKKAZProps = HKKAZProps;
/**
 * HKKAZ (Kontoumsätze)
 * Section C.2.1.1.1.2
 */
class HKKAZ extends segment_1.SegmentClass(HKKAZProps) {
    constructor() {
        super(...arguments);
        this.type = "HKKAZ";
    }
    serialize() {
        const { version, account, endDate, startDate, touchdown } = this;
        const { iban, bic, accountNumber, subAccount, blz } = account;
        if (![4, 5, 6, 7].includes(version)) {
            throw new Error(`Unsupported HKKAZ version ${version}.`);
        }
        const serializedAccount = version === 7 ?
            [iban, bic, accountNumber, subAccount, String(constants_1.COUNTRY_CODE), blz] :
            [accountNumber, subAccount, String(constants_1.COUNTRY_CODE), blz];
        return [
            serializedAccount,
            format_1.Format.jn(false),
            format_1.Format.date(startDate),
            format_1.Format.date(endDate),
            format_1.Format.empty(),
            format_1.Format.stringEscaped(touchdown),
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKKAZ = HKKAZ;
//# sourceMappingURL=hkkaz.js.map