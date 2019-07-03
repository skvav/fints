"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const utils_1 = require("./utils");
/**
 * A set of utilities for formatting data into the fints data formats.
 */
exports.Format = {
    /**
     * Format a date. The time part is ignored.
     *
     * @param date The date to format.
     *
     * @return The formatted string.
     */
    date(date) {
        const dateToFormat = date ? date : new Date();
        return date_fns_1.format(dateToFormat, "YYYYMMDD");
    },
    /**
     * Format a binary string with a length specification.
     *
     * @param str The string to format.
     *
     * @return The formatted string.
     */
    stringWithLength(str) { return `@${str.length}@${str}`; },
    /**
     * Format a boolean with no `false` representation.
     *
     * @param value The boolean to format.
     *
     * @return The formatted string.
     */
    bool(value) { return value ? "J" : ""; },
    /**
     * Return the SEPA identification descriptor.
     *
     * @return The SEPA identification descriptor.
     */
    sepaDescriptor() {
        return "urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.001.03";
    },
    /**
     * Format a number.
     *
     * @param num The number to format.
     *
     * @return The formatted string.
     */
    num(num) { return `${num}`.replace(/\./, ","); },
    /**
     * Format a normal string, escaping all control characters.
     *
     * @param str The string to format.
     *
     * @return The formatted string.
     */
    stringEscaped(str) {
        if (!str) {
            return "";
        }
        return utils_1.escapeFinTS(str);
    },
    /**
     * Format a set of digits.
     *
     * @param num The number to format.
     *
     * @return The formatted string.
     */
    dig(num) { return utils_1.leftPad(String(num), 12); },
    /**
     * Format a time. The date part is ignored.
     *
     * @param date The date to format.
     *
     * @return The formatted string.
     */
    time(date) {
        const dateToFormat = date ? date : new Date();
        return date_fns_1.format(dateToFormat, "HHMMss");
    },
    /**
     * Return an empty string.
     *
     * @return An empty string.
     */
    empty() { return ""; },
    /**
     * Format a boolean with an explicit `false` representation (named "JN" in the official documentation).
     *
     * @param value The boolean to format.
     *
     * @return The formatted string.
     */
    jn(bool) { return bool ? "J" : "N"; },
};
//# sourceMappingURL=format.js.map