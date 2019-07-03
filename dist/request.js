"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const segments_1 = require("./segments");
const constants_1 = require("./constants");
/**
 * Properties used to constructe a `Request`.
 */
class RequestConfig {
    constructor() {
        /**
         * A list of allowed TAN methods as configured by the server.
         */
        this.tanMethods = [];
        /**
         * All segments that should be transmitted in the HNVSD segment of the request.
         */
        this.segments = [];
    }
}
exports.RequestConfig = RequestConfig;
/**
 * A single request holding multiple segments.
 * Will likely embedded in a dialog.
 */
class Request extends RequestConfig {
    constructor(config) {
        super();
        Object.assign(this, config);
        // Generate `this.secRef`.
        this.secRef = Math.floor(1000000 + Math.random() * 8999999);
    }
    /**
     * Determines if a TAN method with a "999" security function is available.
     * This determines whether profile version 2 can be used.
     */
    get hasNo999SecurityFunction() {
        return this.tanMethods.length > 0 && !this.tanMethods.some(method => method.securityFunction === "999");
    }
    /**
     * Use security profile version 2 if the server supports it.
     * Will be `1` or `2`, depending on the server's capabilities.
     */
    get profileVersion() {
        return this.hasNo999SecurityFunction ? 2 : 1;
    }
    /**
     * Determines the security function to use. Will default to the first one if the "999" security function is
     * unavailable.
     */
    get securityFunction() {
        return this.hasNo999SecurityFunction ? this.tanMethods[0].securityFunction : "999";
    }
    /**
     * Returns the total number of segments in this request, including all header meta segments.
     */
    get segmentCount() {
        // Add `3` because of:
        // - Not zero-based (0)
        // - HNHBK (1)
        // - HNSHK (2)
        return this.segments.length + 3;
    }
    /**
     * An array of all segments, including the HNVSD segment wrapping the user payload segments.
     */
    get fullSegments() {
        const { dialogId, secRef, blz, name, systemId, profileVersion, segmentCount, msgNo, pin, tan, securityFunction, } = this;
        const segmentsWithoutHeader = [
            new segments_1.HNVSK({ segNo: 998, blz, name, systemId, profileVersion }),
            new segments_1.HNVSD({
                segNo: 999,
                segments: [
                    new segments_1.HNSHK({ segNo: 2, secRef, blz, name, systemId, profileVersion, securityFunction }),
                    ...this.segments,
                    new segments_1.HNSHA({ segNo: segmentCount, secRef, pin, tan }),
                ],
            }),
            // Add `1` to the index because of HNSHA.
            new segments_1.HNHBS({ segNo: segmentCount + 1, msgNo }),
        ];
        let length = segmentsWithoutHeader.reduce((result, segment) => result + String(segment).length, 0) +
            constants_1.HEADER_LENGTH +
            dialogId.length +
            String(msgNo).length;
        return [
            new segments_1.HNHBK({ segNo: 1, msgLength: length, dialogId, msgNo }),
            ...segmentsWithoutHeader,
        ];
    }
    /**
     * Generate a textual representation for debug purposes.
     */
    get debugString() {
        return this.segments.map(segment => segment.debugString).join("\n");
    }
    /**
     * Serialize the whole request into a string that can be sent to the server.
     */
    toString() {
        return this.fullSegments
            .map(segment => String(segment))
            .join("");
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map