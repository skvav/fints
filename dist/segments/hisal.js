"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const parse_1 = require("../parse");
class HISALProps {
}
exports.HISALProps = HISALProps;
/**
 * HISAL (Saldenrückmeldung)
 * Section C.2.1.2.2
 */
class HISAL extends segment_1.SegmentClass(HISALProps) {
    constructor() {
        super(...arguments);
        this.type = "HISAL";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[accountNumber, subAccount, _country, blz], [productName], [currency], [_cb, booked], [_cp, pending], [dispo], [available],] = input;
        this.account = { accountNumber, subAccount, blz, iban: null, bic: null };
        this.productName = productName;
        this.currency = currency;
        this.bookedBalance = parse_1.Parse.num(booked);
        this.pendingBalance = parse_1.Parse.num(pending);
        this.creditLimit = parse_1.Parse.num(dispo);
        this.availableBalance = parse_1.Parse.num(available);
    }
}
exports.HISAL = HISAL;
//# sourceMappingURL=hisal.js.map