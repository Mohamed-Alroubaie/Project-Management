import prisma from '../utils/db';

import { Task, Prisma } from '@prisma/client';
import {
  validateTaskData,
  CustomTaskValidationError,
} from '../utils/taskValidation'; // Correct import path and naming
import logger from '../utils/logger';

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    return await prisma.task.findMany();
  }

  async getTaskById(taskId: string): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: { id: taskId },
    });
  }

  async createTask(taskData: Prisma.TaskCreateInput): Promise<Task> {
    try {
      await validateTaskData(taskData);

      const { title, description, status, priority } = taskData;

      if (typeof title === 'string') {
        return await prisma.task.create({
          data: {
            title,
            description,
            status,
            priority,
          },
        });
      } else {
        throw new Error('Title is missing or invalid.');
      }
    } catch (error: any) {
      if (error instanceof CustomTaskValidationError) {
        // Adjust the error type here
        throw error;
      }
      logger.error(`Error creating task: ${error}`);
      throw new Error('Failed to create task.');
    }
  }

  async updateTask(
    taskId: string,
    taskData: Prisma.TaskUpdateInput
  ): Promise<Task | null> {
    try {
      await validateTaskData(taskData);

      const { title, description, status, priority } = taskData;

      const existingTask = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!existingTask) {
        throw new Error('Task not found.');
      }

      const dataToUpdate: Prisma.TaskUpdateInput = {};

      if (typeof title === 'string') {
        dataToUpdate.title = title;
      }

      // Other field checks and updates can be added similarly

      return await prisma.task.update({
        where: { id: taskId },
        data: dataToUpdate,
      });
    } catch (error: any) {
      if (error instanceof CustomTaskValidationError) {
        // Adjust the error type here
        throw error;
      }
      logger.error(`Error updating task with ID ${taskId}: ${error}`);
      throw new Error(`Failed to update task with ID ${taskId}.`);
    }
  }

  async deleteTask(taskId: string): Promise<Task | null> {
    try {
      return await prisma.task.delete({
        where: { id: taskId },
      });
    } catch (error: any) {
      logger.error(`Error deleting task with ID ${taskId}: ${error}`);
      throw new Error(`Failed to delete task with ID ${taskId}.`);
    }
  }
}

export default TaskService;
