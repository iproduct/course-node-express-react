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
Object.defineProperty(exports, "__esModule", { value: true });
const dns = require("dns/promises"); // const dns = require('dns')
const domain = 'yahoo.com';
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addresses = yield dns.resolve(domain);
        addresses.map((addr) => __awaiter(void 0, void 0, void 0, function* () {
            const hostnames = yield dns.reverse(addr);
            console.log(`Reverse for ${addr}: ${JSON.stringify(hostnames)}`);
        }));
    }
    catch (err) {
        throw (err);
    }
}))(); //IIFE
//# sourceMappingURL=02-dns-promises.js.map