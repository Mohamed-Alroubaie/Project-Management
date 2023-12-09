import { Request, Response } from 'express';
import TaskService from '../services/taskService';
import { Task } from '@prisma/client';

const taskService = new TaskService();

class TaskController {
  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const task = await taskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const newTask = req.body as Task;
    try {
      const task = await taskService.createTask(newTask);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedFields = req.body as Partial<Task>;
    try {
      const updatedTask = await taskService.updateTask(id, updatedFields);
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedTask = await taskService.deleteTask(id);
      if (!deletedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(deletedTask);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default TaskController;
