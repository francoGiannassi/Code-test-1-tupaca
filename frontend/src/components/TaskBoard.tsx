import React, { useEffect, useState } from 'react';
import './TaskBoard.css';
import { Task } from '../interfaces/task.ts'
import TaskFilter from './TaskFilter';
import TaskSort from './TaskSort';
import Modal from './Modal';
import NewTaskForm from './newTaskForm.tsx';
import { getAllTasks, updateTask, deleteTask } from '../api/api.ts';


const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterName, setFilterName] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'Por hacer' | 'En progreso' | 'Hecho' | ''>('');
  const [sortByNameAsc, setSortByNameAsc] = useState<boolean>(true);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  useEffect(() => {
    void loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await getAllTasks();
      const filteredTasks = filterTasks(fetchedTasks);
      const sortedTasks = sortTasks(filteredTasks);
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error al cargar las tareas', error);
    }
  };

  const moveTask = async (task: Task, newStatus: 'Por hacer' | 'En progreso' | 'Hecho') => {
    try {
      const updatedTask = await updateTask(task.id, {
        status: newStatus,
        id: task.id,
        name: task.name,
        description: task.description,
        createdAt: task.createdAt
      });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error('Error al mover la tarea', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea', error);
    }
  };

  const filterTasks = (tasksToFilter: Task[]): Task[] => {
    return tasksToFilter.filter((task) => {
      const nameMatch = task.name.toLowerCase().includes(filterName.toLowerCase());
      const statusMatch = filterStatus === '' || task.status === filterStatus;
      return nameMatch && statusMatch;
    });
  };

  const sortTasks = (tasksToSort: Task[]): Task[] => {
    const sortedTasks = [...tasksToSort];
    if(sortByNameAsc) {
      sortedTasks.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }
      );
      return sortedTasks;
    }
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
    return sortedTasks;
  };

  const handleOpenNewTaskForm = () => {
    setShowNewTaskForm(true);
  };

  const handleCloseNewTaskForm = () => {
    setShowNewTaskForm(false);
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="task-board">
      <h2>Tablero de Tareas</h2>
      <div className="filters-and-sort">
        <TaskFilter
          filterName={filterName}
          filterStatus={filterStatus}
          setFilterName={setFilterName}
          setFilterStatus={setFilterStatus}
        />
        <TaskSort sortByNameAsc={sortByNameAsc} setSortByNameAsc={setSortByNameAsc} />
        <button onClick={loadTasks}>Buscar</button>
      </div>
      <div className="new-task">
        <button onClick={handleOpenNewTaskForm}>Agregar Nueva Tarea</button>
        {showNewTaskForm && (
          <Modal onClose={handleCloseNewTaskForm}>
            <NewTaskForm onClose={handleCloseNewTaskForm} onTaskAdded={handleTaskAdded} />
          </Modal>
        )}
      </div>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No hay tareas cargadas</p>
        ) : (<p></p>)}
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.status.toLowerCase()}`}>
            <h4>{task.name}</h4>
            <p>{task.description}</p>
            <div className="task-actions">
              <button className={task.status === 'Por hacer' ? 'active-button-porhacer' : ''} onClick={() => moveTask(task, 'Por hacer')}>Por hacer</button>
              <button className={task.status === 'En progreso' ? 'active-button-enprogreso' : ''} onClick={() => moveTask(task, 'En progreso')}>En progreso</button>
              <button className={task.status === 'Hecho' ? 'active-button-hecho' : ''} onClick={() => moveTask(task, 'Hecho')}>Hecho</button>
              <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;