"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var basic_auth_1 = __importDefault(require("basic-auth"));
var jsonServer = __importStar(require("json-server")); // Importe o json-server desta forma
var app = (0, express_1.default)();
// Implemente a autenticação básica ANTES de criar o roteador e usar os middlewares do JSON Server
app.use(function (req, res, next) {
    var user = (0, basic_auth_1.default)(req);
    console.log('user');
    // Defina suas credenciais de usuário e senha aqui
    var validUser = { name: 'usuario1', pass: '123456' };
    console.log('validUser');
    if (!user || user.name !== validUser.name || user.pass !== validUser.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
    next();
});
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Use os middlewares do JSON Server
app.use(middlewares);
// Roteie as solicitações para o JSON Server
app.use(router);
// Inicie o servidor na porta 3333
app.listen(3333, function () {
    console.log('JSON Server rodando na porta 3333');
});
