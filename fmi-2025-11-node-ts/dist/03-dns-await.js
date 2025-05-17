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
const dns_1 = require("dns"); // const dns=require('dns')
const domain = 'yahoo.com';
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addresses = yield dns_1.promises.resolve(domain);
        console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`);
        addresses.map((addr) => __awaiter(void 0, void 0, void 0, function* () {
            const hostnames = yield dns_1.promises.reverse(addr);
            console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`);
        }));
    }
    catch (err) {
        console.error(err);
    }
}))(); // IIFE
//# sourceMappingURL=03-dns-await.js.map