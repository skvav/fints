"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const fast_xml_parser_1 = require("fast-xml-parser");
/**
 * A set of utilities for parsing data from the fints data formats.
 */
exports.Parse = {
    /**
     * Parse a boolean (JN).
     *
     * @param str The string to parse.
     *
     * @return The parsed boolean.
     */
    bool(str) {
        if (str === "J") {
            return true;
        }
        return false;
    },
    /**
     * Parse a number.
     *
     * @param str The string to parse.
     *
     * @return The parsed number.
     */
    num(str) {
        if (typeof str === "undefined") {
            return;
        }
        return Number(str.replace(/,/, "."));
    },
    /**
     * Parse a set of digits.
     *
     * @param str The string to parse.
     *
     * @return The parsed number.
     */
    dig(str) {
        if (str === "0") {
            return 0;
        }
        while (str.startsWith("0")) {
            str = str.substr(1, str.length);
        }
        return Number(str);
    },
    /**
     * Parse a date.
     *
     * @param str The string or date to parse.
     *
     * @return The parsed date.
     */
    date(str) {
        return date_fns_1.parse(str);
    },
    /**
     * Parse a xml document to an object.
     *
     * @param str The xml parse.
     *
     * @return The parsed object.
     */
    xml(str) {
        return fast_xml_parser_1.parse(str);
    },
};
//# sourceMappingURL=parse.js.map