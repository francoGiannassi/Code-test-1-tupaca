import axios from 'axios';
import { Task } from '../interfaces/task.ts';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await instance.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await instance.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (taskId: string, task: Task): Promise<Task> => {
  const response = await instance.put<Task>(`/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await instance.delete(`/tasks/${taskId}`);
};