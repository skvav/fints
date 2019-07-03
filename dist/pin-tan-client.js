"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const dialog_1 = require("./dialog");
const request_1 = require("./request");
const http_connection_1 = require("./http-connection");
class PinTanClient extends client_1.Client {
    constructor(config) {
        super();
        this.config = config;
        const { url, debug } = config;
        this.connection = new http_connection_1.HttpConnection({ url, debug });
    }
    createDialog() {
        const { blz, name, pin } = this.config;
        const { connection } = this;
        return new dialog_1.Dialog({ blz, name, pin, systemId: "0", connection });
    }
    createRequest(dialog, segments, tan) {
        const { blz, name, pin } = this.config;
        const { systemId, dialogId, msgNo, tanMethods } = dialog;
        return new request_1.Request({ blz, name, pin, systemId, dialogId, msgNo, segments, tanMethods, tan });
    }
}
exports.PinTanClient = PinTanClient;
//# sourceMappingURL=pin-tan-client.js.map