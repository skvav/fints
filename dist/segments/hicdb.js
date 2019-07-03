"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const parse_1 = require("../parse");
class HICDBProps {
}
exports.HICDBProps = HICDBProps;
/**
 * HICDB (SEPA-Dauerauftragsbestand rückmelden)
 * Section C.10.2.3.4
 */
class HICDB extends segment_1.SegmentClass(HICDBProps) {
    constructor() {
        super(...arguments);
        this.type = "HICDB";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        const [[], [], [sepaMessage], [], [nextOrder, timeUnit, interval, orderDay, lastOrder],] = input;
        const parsed = parse_1.Parse.xml(sepaMessage);
        if (!this.isDocument(parsed)) {
            throw new Error("Received sepa-message seems not to be a valid 'Document' object!");
        }
        const jsonMessage = parsed.Document.CstmrCdtTrfInitn;
        const instructionInfo = Array.isArray(jsonMessage.PmtInf)
            ? jsonMessage.PmtInf[0]
            : jsonMessage.PmtInf;
        const creditTransaction = Array.isArray(instructionInfo.CdtTrfTxInf)
            ? instructionInfo.CdtTrfTxInf[0]
            : instructionInfo.CdtTrfTxInf;
        this.standingOrder = {
            nextOrderDate: parse_1.Parse.date(nextOrder),
            timeUnit,
            interval: parse_1.Parse.num(interval),
            orderDay: parse_1.Parse.num(orderDay),
            lastOrderDate: lastOrder ? parse_1.Parse.date(lastOrder) : null,
            creationDate: parse_1.Parse.date(jsonMessage.GrpHdr.CreDtTm),
            amount: jsonMessage.GrpHdr.CtrlSum,
            paymentPurpose: creditTransaction.RmtInf.Ustrd,
            debitor: {
                name: instructionInfo.Dbtr.Nm,
                iban: instructionInfo.DbtrAcct.Id.IBAN,
                bic: instructionInfo.DbtrAgt.FinInstnId.BIC,
            },
            creditor: {
                name: creditTransaction.Cdtr.Nm,
                iban: creditTransaction.CdtrAcct.Id.IBAN,
                bic: creditTransaction.CdtrAgt.FinInstnId.BIC,
            },
        };
    }
    isDocument(d) {
        return typeof d !== "undefined"
            && typeof d.Document !== "undefined"
            && typeof d.Document.CstmrCdtTrfInitn !== "undefined";
    }
}
exports.HICDB = HICDB;
//# sourceMappingURL=hicdb.js.map