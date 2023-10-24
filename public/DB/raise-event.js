"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raiseEvent = exports.Events = void 0;
const event_1 = __importDefault(require("./schema/event"));
var Events;
(function (Events) {
    Events["ContractCreated"] = "contract_created";
    Events["ContractUpdated"] = "contract_updated";
    Events["ContractDeleted"] = "contract_deleted";
})(Events = exports.Events || (exports.Events = {}));
function raiseEvent(userId, contractId, event) {
    return __awaiter(this, void 0, void 0, function* () {
        yield event_1.default.create({
            eventName: event,
            userId,
            contractId,
        });
    });
}
exports.raiseEvent = raiseEvent;
exports.default = raiseEvent;
