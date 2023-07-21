import React from 'react';
import './TaskFilter.css';

interface TaskFilterProps {
  filterName: string;
  filterStatus: 'Por hacer' | 'En progreso' | 'Hecho' | '';
  setFilterName: (name: string) => void;
  setFilterStatus: (status: 'Por hacer' | 'En progreso' | 'Hecho' | '') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ setFilterName, setFilterStatus }) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };
return (
    <div className="task-filter">
      <label htmlFor="filterName">Filtrar por nombre:</label>
      <input type="text" id="filterName" onChange={handleNameChange} />

      <label htmlFor="filterStatus">Filtrar por estado:</label>
      <select id="filterStatus" onChange={handleStatusChange}>
        <option value="">Todos</option>
        <option value="Por hacer">Por hacer</option>
        <option value="En progreso">En progreso</option>
        <option value="Hecho">Hecho</option>
      </select>
    </div>
  );
};

export default TaskFilter;