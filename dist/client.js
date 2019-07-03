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
require("cross-fetch");
const segments_1 = require("./segments");
const mt940_js_1 = require("mt940-js");
const mt940_86_structured_1 = require("./mt940-86-structured");
/**
 * An abstract class for communicating with a fints server.
 * For a common implementation look at `PinTanClient`.
 */
class Client {
    /**
     * Fetch a list of all SEPA accounts accessible by the user.
     *
     * @return An array of all SEPA accounts.
     */
    accounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.createDialog();
            yield dialog.sync();
            yield dialog.init();
            const response = yield dialog.send(this.createRequest(dialog, [
                new segments_1.HKSPA({ segNo: 3 }),
            ]));
            yield dialog.end();
            const hispa = response.findSegment(segments_1.HISPA);
            return hispa.accounts;
        });
    }
    /**
     * Fetch the balance for a SEPA account.
     *
     * @param account The SEPA account to fetch the balance for.
     *
     * @return The balance of the given SEPA account.
     */
    balance(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.createDialog();
            yield dialog.sync();
            yield dialog.init();
            let touchdowns;
            let touchdown;
            const responses = [];
            do {
                const request = this.createRequest(dialog, [
                    new segments_1.HKSAL({
                        segNo: 3,
                        version: dialog.hisalsVersion,
                        account,
                        touchdown,
                    }),
                ]);
                const response = yield dialog.send(request);
                touchdowns = response.getTouchdowns(request);
                touchdown = touchdowns.get("HKSAL");
                responses.push(response);
            } while (touchdown);
            yield dialog.end();
            const segments = responses.reduce((result, response) => {
                result.push(...response.findSegments(segments_1.HISAL));
                return result;
            }, []);
            const hisal = segments.find(s => s.account.accountNumber === account.accountNumber && s.account.blz === account.blz);
            return {
                account,
                availableBalance: hisal.availableBalance,
                bookedBalance: hisal.bookedBalance,
                currency: hisal.currency,
                creditLimit: hisal.creditLimit,
                pendingBalance: hisal.pendingBalance,
                productName: hisal.productName,
            };
        });
    }
    /**
     * Fetch a list of bank statements deserialized from the MT940 transmitted by the fints server.
     *
     * @param startDate The start of the range for which the statements should be fetched.
     * @param endDate The end of the range for which the statements should be fetched.
     *
     * @return A list of all statements in the specified range.
     */
    statements(account, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.createDialog();
            yield dialog.sync();
            yield dialog.init();
            let touchdowns;
            let touchdown;
            const responses = [];
            do {
                const request = this.createRequest(dialog, [
                    new segments_1.HKKAZ({
                        segNo: 3,
                        version: dialog.hikazsVersion,
                        account,
                        startDate,
                        endDate,
                        touchdown,
                    }),
                ]);
                const response = yield dialog.send(request);
                touchdowns = response.getTouchdowns(request);
                touchdown = touchdowns.get("HKKAZ");
                responses.push(response);
            } while (touchdown);
            yield dialog.end();
            const segments = responses.reduce((result, response) => {
                result.push(...response.findSegments(segments_1.HIKAZ));
                return result;
            }, []);
            const bookedString = segments.map(segment => segment.bookedTransactions || "").join("");
            const unprocessedStatements = yield mt940_js_1.read(Buffer.from(bookedString, "utf8"));
            return unprocessedStatements.map(statement => {
                const transactions = statement.transactions.map(transaction => {
                    if (!mt940_86_structured_1.is86Structured(transaction.description)) {
                        return transaction;
                    }
                    const descriptionStructured = mt940_86_structured_1.parse86Structured(transaction.description);
                    return Object.assign({}, transaction, { descriptionStructured });
                });
                return Object.assign({}, statement, { transactions });
            });
        });
    }
    /**
     * Fetch a list of standing orders for the given account.
     *
     * @param account The account to fetch standing orders for.
     *
     * @return A list of all standing orders for the given account.
     */
    standingOrders(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialog = this.createDialog();
            yield dialog.sync();
            yield dialog.init();
            let touchdowns;
            let touchdown;
            const responses = [];
            do {
                const request = this.createRequest(dialog, [
                    new segments_1.HKCDB({
                        segNo: 3,
                        version: dialog.hicdbVersion,
                        account,
                        painFormats: dialog.painFormats,
                        touchdown,
                    }),
                ]);
                const response = yield dialog.send(request);
                touchdowns = response.getTouchdowns(request);
                touchdown = touchdowns.get("HKCDB");
                responses.push(response);
            } while (touchdown);
            yield dialog.end();
            const segments = responses.reduce((result, response) => {
                result.push(...response.findSegments(segments_1.HICDB));
                return result;
            }, []);
            return segments.map(s => s.standingOrder);
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map