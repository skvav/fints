"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../parse");
const utils_1 = require("../utils");
/**
 * A segment of a message.
 * Each message sent to the server or received from it will consist of multiple segments.
 * Each segment itself is versionized and has a segment type.
 * Segments within a message are numbered.
 */
class Segment {
    constructor(arg) {
        this.defaults();
        if (typeof arg === "object" && !Array.isArray(arg)) {
            Object.assign(this, arg);
        }
        else {
            const splitted = typeof arg === "string" ? utils_1.parse(arg)[0] : arg;
            this.segNo = parse_1.Parse.num(splitted[0][1]);
            this.version = parse_1.Parse.num(splitted[0][2]);
            if (splitted[0].length > 3) {
                this.reference = parse_1.Parse.num(splitted[0][3]);
            }
            this.deserialize(splitted.slice(1));
        }
    }
    /**
     * Segments can override this function to provide defaults for their properties.
     */
    defaults() { return; }
    /**
     * Serialize the segment into a string that can be used for serializing a request.
     */
    toString() {
        const header = `${this.type}:${this.segNo}:${this.version}`;
        const body = this.serialize()
            .map(data => Array.isArray(data) ? data.join(":") : data)
            .join("+");
        return `${header}+${body}'`;
    }
    /**
     * Generate a textual representation for debug purposes.
     */
    get debugString() {
        const info = `Type: ${this.type}\n` +
            `Version: ${this.version}\n` +
            `Segment Number: ${this.segNo}\n` +
            `Referencing: ${this.reference === undefined ? "None" : this.reference}\n` +
            `----\n`;
        return this.serialize().reduce((result, group, index) => {
            return `${result}DG ${index}: ${Array.isArray(group) ? group.join(", ") : group}\n`;
        }, info);
    }
}
exports.Segment = Segment;
/**
 * Create a base class for segments, inheriting from `Segment` and the segment's props.
 */
function SegmentClass(propsClass) {
    class TempSegment extends Segment {
    }
    const mutableClass = TempSegment;
    Object.getOwnPropertyNames(propsClass.prototype)
        .filter(name => name !== "constructor")
        .forEach(name => {
        mutableClass.prototype[name] = propsClass.prototype[name];
    });
    return mutableClass;
}
exports.SegmentClass = SegmentClass;
//# sourceMappingURL=segment.js.map