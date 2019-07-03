"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format_1 = require("../format");
const parse_1 = require("../parse");
const segment_1 = require("./segment");
const constants_1 = require("../constants");
class HNHBKProps {
}
exports.HNHBKProps = HNHBKProps;
/**
 * HNHBK (Nachrichtenkopf)
 * Section B.5.2
 */
class HNHBK extends segment_1.SegmentClass(HNHBKProps) {
    constructor() {
        super(...arguments);
        this.type = "HNHBK";
    }
    defaults() {
        this.version = 3;
    }
    serialize() {
        const { msgLength, dialogId, msgNo, refMsg } = this;
        const result = [
            format_1.Format.dig(msgLength),
            format_1.Format.num(constants_1.HBCI_VERSION),
            dialogId,
            format_1.Format.num(msgNo),
        ];
        if (refMsg) {
            result.push([refMsg.dialogId, String(refMsg.msgNo)]);
        }
        return result;
    }
    deserialize(input) {
        const [[msgLength], [hbciVersion], [dialogId], [msgNo], refMsg] = input;
        if (hbciVersion !== "300") {
            throw new Error(`Version mismatch. Server is using HBCI version ${hbciVersion}.`);
        }
        this.msgLength = parse_1.Parse.dig(msgLength);
        this.dialogId = dialogId;
        this.msgNo = parse_1.Parse.dig(msgNo);
        if (typeof refMsg !== "undefined") {
            const [refDialogId, refMsgNo] = refMsg;
            this.refMsg = {
                dialogId: refDialogId,
                msgNo: parse_1.Parse.num(refMsgNo),
            };
        }
    }
}
exports.HNHBK = HNHBK;
//# sourceMappingURL=hnhbk.js.map