"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin_1 = __importDefault(require("./admin"));
var admin = new admin_1.default("Guilherme", "guilherme.yokota20@gmail.com", "123", true);
admin.setName = "Samuel";
admin.setEmail = "algumacoisa123@gmail.com";
admin.setPasswrod = "1234";
console.log(admin.getName);
console.log(admin.getEmail);
console.log(admin.getPassword);
