"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = {
    verbose: () => { },
    warn: () => { },
    error: () => { },
};
exports.logger.silent = true;
exports.verbose = (...args) => exports.logger.verbose(...args);
exports.warn = (...args) => exports.logger.warn(...args);
exports.error = (...args) => exports.logger.error(...args);
//# sourceMappingURL=logger.js.map