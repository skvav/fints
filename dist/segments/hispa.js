"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
class HISPAProps {
}
exports.HISPAProps = HISPAProps;
/**
 * HISPA (SEPA-Kontoverbindung rückmelden)
 * Section C.10.1.3
 */
class HISPA extends segment_1.SegmentClass(HISPAProps) {
    constructor() {
        super(...arguments);
        this.type = "HISPA";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        this.accounts = input.map(([hasSepa, iban, bic, accountNumber, subAccount, countryCode, blz]) => ({
            iban, bic, accountNumber, subAccount, blz,
        }));
    }
}
exports.HISPA = HISPA;
//# sourceMappingURL=hispa.js.map