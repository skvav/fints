"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("./segment");
const return_value_1 = require("../return-value");
class HIRMGProps {
}
exports.HIRMGProps = HIRMGProps;
/**
 * HIRMG (Rückmeldungen zur Gesamtnachricht)
 * Section B.7.2
 */
class HIRMG extends segment_1.SegmentClass(HIRMGProps) {
    constructor() {
        super(...arguments);
        this.type = "HIRMG";
    }
    defaults() {
        this.version = 2;
    }
    serialize() { throw new Error("Not implemented."); }
    deserialize(input) {
        this.returnValues = new Map();
        input
            .map(dataElements => {
            const [code, , message, ...parameters] = dataElements;
            return new return_value_1.ReturnValue({
                code,
                message,
                parameters,
            });
        })
            .forEach(response => this.returnValues.set(response.code, response));
    }
}
exports.HIRMG = HIRMG;
//# sourceMappingURL=hirmg.js.map