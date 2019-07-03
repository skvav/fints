"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iconv_lite_1 = require("iconv-lite");
/**
 * Base 64 encode a string for use with fints. Fints uses ISO-8859-1 encoding which will be the encoding used
 * in the base 64 data.
 *
 * @param input The string to encode.
 *
 * @return The encoded string.
 */
function encodeBase64(input) {
    return Buffer.from(iconv_lite_1.encode(input, "ISO-8859-1")).toString("base64");
}
exports.encodeBase64 = encodeBase64;
/**
 * Decode a base 64 encoded string received from a fints server.
 * Fints uses ISO-8859-1 encoding which will be converted into UTF-8.
 *
 * @param input The string to decode.
 *
 * @return The decoded string.
 */
function decodeBase64(input) {
    return iconv_lite_1.decode(Buffer.from(input, "base64"), "ISO-8859-1");
}
exports.decodeBase64 = decodeBase64;
/**
 * Parse a full fints message into a set of segments containing a set of data groups containing a set of
 * data elements.
 * Can be parsed further by using segment classes.
 * Bit strings with length will be resolved here.
 *
 * @param input The string to parse.
 *
 * @return Set of segments.
 */
function parse(input) {
    if (input[input.length - 1] !== "'") {
        throw new Error(`String must end with "'"`);
    }
    // Store currently active output.
    const segments = [];
    let groups = [];
    let elements = [];
    let str = "";
    // Will be set to `true` if a `?` was encountered, which is used for escaping.
    let escapeActive = false;
    // Called when a segment was finished (a `'` was encountered).
    // Will reset all state and save the current segment to the list of segments.
    const flushSegment = () => {
        flushGroup();
        segments.push(groups);
        groups = [];
    };
    // Called when a data group was finished (a `+` was encountered).
    // Will reset the group and elements state and save the current group to the list of groups.
    const flushGroup = () => {
        flushElement();
        groups.push(elements);
        elements = [];
    };
    // Called when a data element was finished (a `:` was encountered).
    // Will reset the string's state and save the current element to the list of elements.
    const flushElement = () => {
        elements.push(str);
        str = "";
    };
    // Traverse the input character by character.
    for (let i = 0; i < input.length; ++i) {
        const character = input.charAt(i);
        // If the last character was a questionmark, this character is escaped.
        if (escapeActive) {
            if (![":", "'", "+", "?", "@"].includes(character)) {
                throw new Error(`Unexpected escape sequence "?${character}" at ${i}`);
            }
            str += character;
            escapeActive = false;
            continue;
        }
        // Handle control characters or append default characters to string.
        switch (character) {
            case "@":
                i++;
                let lengthString = "";
                for (; i < input.length; ++i) {
                    const subCharacter = input.charAt(i);
                    if (subCharacter === "@") {
                        break;
                    }
                    lengthString += subCharacter;
                }
                i++;
                const endIndex = i + Number(lengthString);
                for (; i < endIndex; ++i) {
                    str += input.charAt(i);
                }
                i--;
                break;
            case "?":
                escapeActive = true;
                break;
            case "'":
                flushSegment();
                break;
            case "+":
                flushGroup();
                break;
            case ":":
                // An ":" was encountered, flush the current group.
                flushElement();
                break;
            default:
                str += character;
                break;
        }
    }
    return segments;
}
exports.parse = parse;
/**
 * Fill up the string with the specified character from the left.
 *
 * @param str String to pad.
 * @param count Limit to which the string should be padded.
 * @param character Character to pad the string with. Defaults to "0".
 *
 * @return The padded string.
 */
function leftPad(str, count, character = "0") {
    while (str.length < count) {
        str = `${character}${str}`;
    }
    return str;
}
exports.leftPad = leftPad;
/**
 * Escape a string into fints representation.
 *
 * @param content The string to escape.
 *
 * @return The escaped string.
 */
function escapeFinTS(content) {
    if (typeof content === "undefined") {
        return "";
    }
    return content
        .replace(/\?/g, "??")
        .replace(/\+/g, "?+")
        .replace(/:/g, "?:")
        .replace(/'/g, "?'")
        .replace(/@/g, "?@");
}
exports.escapeFinTS = escapeFinTS;
/**
 * Unescape a string from fints representation.
 *
 * @param content The string to unescape.
 *
 * @return The unescaped string.
 */
function unescapeFinTS(content) {
    if (typeof content === "undefined") {
        return "";
    }
    return content
        .replace(/\?\?/g, "?")
        .replace(/\?\+/g, "+")
        .replace(/\?:/g, ":")
        .replace(/\?'/g, "'")
        .replace(/\?@/g, "@");
}
exports.unescapeFinTS = unescapeFinTS;
//# sourceMappingURL=utils.js.map