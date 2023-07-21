import React from 'react';
import './TaskSort.css';

interface TaskSortProps {
  sortByNameAsc: boolean;
  setSortByNameAsc: (asc: boolean) => void;
}

const TaskSort: React.FC<TaskSortProps> = ({ setSortByNameAsc }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const flag = event.target.value === "name" ? true : false;
    setSortByNameAsc(flag);
  };

  return (
    <div className="task-sort">
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="name">Nombre</option>
        <option value="creationDate">Fecha de creación</option>
      </select>
    </div>
  );
};

export default TaskSort;