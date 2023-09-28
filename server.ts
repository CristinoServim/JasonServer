import express, { Request, Response, NextFunction } from 'express';
import basicAuth from 'basic-auth';
import * as jsonServer from 'json-server'; // Importe o json-server desta forma

const app = express();

// Implemente a autenticação básica ANTES de criar o roteador e usar os middlewares do JSON Server
app.use((req: Request, res: Response, next: NextFunction) => {
    const user = basicAuth(req);
    console.log('user')

    // Defina suas credenciais de usuário e senha aqui
    const validUser = { name: 'usuario1', pass: '123456' };
    console.log('validUser')

    if (!user || user.name !== validUser.name || user.pass !== validUser.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }

    next();
});

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use os middlewares do JSON Server
app.use(middlewares);

// Roteie as solicitações para o JSON Server
app.use(router);

// Inicie o servidor na porta 3333
app.listen(3333, () => {
    console.log('JSON Server rodando na porta 3333');
});
