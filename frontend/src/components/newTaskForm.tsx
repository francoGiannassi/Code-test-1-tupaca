import React, { useState } from 'react';
import { Task } from '../interfaces/task.ts';
import { createTask } from '../api/api';

interface NewTaskFormProps {
  onClose: () => void;
  onTaskAdded: (newTask: Task) => void;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onClose, onTaskAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask: Task = {
      id: 0,
      name,
      description,
      status: 'Por hacer',
    };

    try {
      const createdTask = await createTask(newTask);
      onTaskAdded(createdTask);
      onClose();
    } catch (error) {
      console.error('Error al crear la tarea', error);
    }
  };


  return (
    <div>
      <h2>Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button type="submit">Agregar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;