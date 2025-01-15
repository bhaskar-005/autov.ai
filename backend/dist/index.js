"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./router/auth.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const nameSpace_router_1 = __importDefault(require("./router/nameSpace.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_HOST,
    credentials: true,
}));
app.get('/status', (req, res) => {
    return res.status(200).json({
        message: "server is running.."
    });
});
app.use('/api/v1/auth', auth_router_1.default);
app.use('/api/v1', nameSpace_router_1.default);
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
