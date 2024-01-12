"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const typeorm_1 = require("typeorm");
let Account = class Account {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Account.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Account.prototype, "email", void 0);
Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);
exports.Account = Account;
