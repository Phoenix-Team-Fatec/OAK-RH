"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var router = (0, express_1.Router)();
var userController = new userController_1.default();
router.get("/", function (req, res) {
    res.send("Servidor rodando");
});
router.post("/users", function (req, res) {
    userController.cadastrarUsuario(req, res);
});
exports.default = router;
