"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wraps a return value used in the HIRMG and HIRMS segments.
 */
class ReturnValue {
    constructor(props) {
        Object.assign(this, props);
    }
    /**
     * Will be `true` if the return value was a successful one (code starts with "0").
     */
    get success() { return String(this.code).startsWith("0"); }
    /**
     * Will be `true` if the return value was warning (code starts with "3").
     */
    get warning() { return String(this.code).startsWith("3"); }
    /**
     * Will be `true` if the return value was an error (code starts with "9").
     */
    get error() { return String(this.code).startsWith("9"); }
}
exports.ReturnValue = ReturnValue;
//# sourceMappingURL=return-value.js.map