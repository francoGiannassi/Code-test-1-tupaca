import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRouter from './router/taskRouter';

const port = 5000;
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Rutas para las operaciones CRUD de las tareas
app.use('/api', taskRouter);

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});