import express, { Request, Response } from 'express';
import { Task } from '../interfaces/task';

const router = express.Router();

const tasks: Task[] = [];

function generateUniqueId(): string {
    return Date.now().toString();
  }

// Endpoint para obtener todas las tareas
router.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Endpoint para crear una nueva tarea
router.post('/tasks', (req: Request, res: Response) => {
  const newTask: Task = {
    id: generateUniqueId(),
    name: req.body.name,
    description: req.body.description,
    status: 'Por hacer',
    createdAt: new Date(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Endpoint para actualizar una tarea existente
router.put('/tasks/:id', (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedTask = tasks.find((task) => task.id === taskId);

  if (!updatedTask) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  updatedTask.name = req.body.name;
  updatedTask.description = req.body.description;
  updatedTask.status = req.body.status;
  res.json(updatedTask);
});

// Endpoint para eliminar una tarea
router.delete('/tasks/:id', (req: Request, res: Response) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Tarea eliminada con éxito' });
});

export default router;