"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tasks = [];
function generateUniqueId() {
    return Date.now().toString();
}
// Endpoint para obtener todas las tareas
router.get('/tasks', (req, res) => {
    res.json(tasks);
});
// Endpoint para crear una nueva tarea
router.post('/tasks', (req, res) => {
    const newTask = {
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
router.put('/tasks/:id', (req, res) => {
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
router.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada con éxito' });
});
exports.default = router;
