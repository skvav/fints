"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HKSALProps {
}
exports.HKSALProps = HKSALProps;
/**
 * HKSAL (Saldenabfrage)
 * Section C.2.1.2.2
 */
class HKSAL extends segment_1.SegmentClass(HKSALProps) {
    constructor() {
        super(...arguments);
        this.type = "HKSAL";
    }
    serialize() {
        const { version, account, touchdown } = this;
        const { iban, bic, accountNumber, subAccount, blz } = account;
        if (![4, 5, 6, 7].includes(version)) {
            throw new Error(`Unsupported HKSAL version ${version}.`);
        }
        const serializedAccount = version === 7 ?
            [iban, bic, accountNumber, subAccount, String(constants_1.COUNTRY_CODE), blz] :
            [accountNumber, subAccount, String(constants_1.COUNTRY_CODE), blz];
        return [
            serializedAccount,
            format_1.Format.jn(false),
            format_1.Format.empty(),
            format_1.Format.stringEscaped(touchdown),
        ];
    }
    deserialize() { throw new Error("Not implemented."); }
}
exports.HKSAL = HKSAL;
//# sourceMappingURL=hksal.js.map