"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const taskRouter_1 = __importDefault(require("./router/taskRouter"));
const port = 5000;
const app = (0, express_1.default)();
// Middleware para habilitar CORS
app.use((0, cors_1.default)());
// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(body_parser_1.default.json());
// Rutas para las operaciones CRUD de las tareas
app.use('/api', taskRouter_1.default);
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
