"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const segments_1 = require("./segments");
const request_1 = require("./request");
/**
 * Properties passed to configure a `Dialog`.
 */
class DialogConfig {
}
exports.DialogConfig = DialogConfig;
/**
 * A dialog consisting of multiple related requests and responses.
 */
class Dialog extends DialogConfig {
    constructor(config) {
        super();
        /**
         * All messages sent within a dialog are numbered.
         * This counter is kept here.
         */
        this.msgNo = 1;
        /**
         * A unique id for the dialog.
         * Assigned by the server as response to the initial request.
         * For the initial request a `0` needs to be sent.
         */
        this.dialogId = "0";
        /**
         * A list of allowed TAN methods as configured by the server.
         */
        this.tanMethods = [];
        /**
         * The server will only accept a certain version for the HISALS segment.
         * This version defaults to the latest version (6).
         * The server's maximum supported version can be parsed from the initial requests and is stored here.
         */
        this.hisalsVersion = 6;
        /**
         * The server will only accept a certain version for the HIKAZS segment.
         * This version defaults to the latest version (6).
         * The server's maximum supported version can be parsed from the initial requests and is stored here.
         */
        this.hikazsVersion = 6;
        /**
         * The server will only accept a certain version for the HICDB segment.
         * This version defaults to the latest version (1).
         * The server's maximum supported version can be parsed from the initial requests and is stored here.
         */
        this.hicdbVersion = 1;
        /**
         * A list of supported SEPA pain-formats as configured by the server.
         */
        this.painFormats = [];
        Object.assign(this, config);
    }
    /**
     * Send a synchronization request to the server.
     * Only one synchronization is needed per dialog.
     * This is most likely the initial request sent.
     * It will be answered with the system's id and a list of supported TAN methods.
     * The supported HISALS and HIKAZS version can also be parsed from this request.
     *
     * @return The response as received by the server.
     */
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            const { blz, name, pin, systemId, dialogId, msgNo } = this;
            const segments = [
                new segments_1.HKIDN({ segNo: 3, blz, name, systemId: "0" }),
                new segments_1.HKVVB({ segNo: 4 }),
                new segments_1.HKSYN({ segNo: 5 }),
            ];
            const response = yield this.send(new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments }));
            this.systemId = response.systemId;
            this.dialogId = response.dialogId;
            this.hisalsVersion = response.segmentMaxVersion(segments_1.HISALS);
            this.hikazsVersion = response.segmentMaxVersion(segments_1.HIKAZS);
            this.hicdbVersion = response.segmentMaxVersion(segments_1.HICDBS);
            this.tanMethods = response.supportedTanMethods;
            this.painFormats = response.painFormats;
            yield this.end();
        });
    }
    /**
     * Send the initializing request to the server.
     * The dialog is ready for performing custom requests afterwards.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { blz, name, pin, systemId, dialogId, msgNo, tanMethods } = this;
            const segments = [
                new segments_1.HKIDN({ segNo: 3, blz, name, systemId }),
                new segments_1.HKVVB({ segNo: 4 }),
            ];
            const response = yield this.send(new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments, tanMethods }));
            this.dialogId = response.dialogId;
        });
    }
    /**
     * End the currently open request.
     */
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            const { blz, name, pin, systemId, dialogId, msgNo } = this;
            const segments = [
                new segments_1.HKEND({ segNo: 3, dialogId }),
            ];
            yield this.send(new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments }));
            this.dialogId = "0";
            this.msgNo = 1;
        });
    }
    /**
     * Send a custom request to the fints server and return the received response.
     *
     * @param request The request to send to the server.
     *
     * @return The response received from the server.
     */
    send(request) {
        return __awaiter(this, void 0, void 0, function* () {
            request.msgNo = this.msgNo;
            request.dialogId = this.dialogId;
            const response = yield this.connection.send(request);
            if (!response.success) {
                const errors = response.errors.map(error => `"${error}"`).join(", ");
                throw new Error(`Error(s) in dialog: ${errors}.`);
            }
            this.msgNo++;
            return response;
        });
    }
}
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map