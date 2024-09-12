"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var dotenv_1 = __importDefault(require("dotenv"));
var path = require("path");
dotenv_1.default.config({ path: path.resolve(__dirname, 'config/.env') });
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', userRoutes_1.default);
app.listen(PORT, function () {
    console.log("Servidorrrrr rodando na porta ".concat(PORT));
});
