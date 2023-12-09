import { Router } from 'express';
import TaskController from '../controllers/taskController';

const router = Router();
const taskController = new TaskController();

// GET all Tasks
router.get('/', taskController.getAllTasks.bind(taskController));

// GET Task by ID
router.get('/:id', taskController.getTaskById.bind(taskController));

// CREATE a new Task
router.patch('/', taskController.createTask.bind(taskController));

// UPDATE a Task by ID
router.put('/:id', taskController.updateTask.bind(taskController));

// DELETE a Task by ID
router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router;
