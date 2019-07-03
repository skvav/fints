"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const return_value_1 = require("../return-value");
const segment_1 = require("./segment");
class HIRMSProps {
}
exports.HIRMSProps = HIRMSProps;
/**
 * HIRMS (Rückmeldungen zu Segmenten)
 * Section B.7.3
 */
class HIRMS extends segment_1.SegmentClass(HIRMSProps) {
    constructor() {
        super(...arguments);
        this.type = "HIRMS";
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        this.returnValues = new Map();
        input
            .map(dataElements => {
            const [code, references, message, ...parameters] = dataElements;
            return new return_value_1.ReturnValue({
                code,
                message,
                references: references.length > 0 ?
                    references.split(",").map(reference => Number(reference.trim())) : [],
                parameters,
            });
        })
            .forEach(response => this.returnValues.set(response.code, response));
    }
}
exports.HIRMS = HIRMS;
//# sourceMappingURL=hirms.js.map