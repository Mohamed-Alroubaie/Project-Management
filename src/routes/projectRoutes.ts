import { Router } from 'express';
import ProjectController from '../controllers/projectController';

const router = Router();
const projectController = new ProjectController();

// GET all Projects
router.get('/', projectController.getAllProjects.bind(projectController));

// GET Project by ID
router.get('/:id', projectController.getProjectById.bind(projectController));

// CREATE a new Project
router.post('/', projectController.createProject.bind(projectController));

// UPDATE a Project by ID
router.patch('/:id', projectController.updateProject.bind(projectController));

// DELETE a Project by ID
router.delete('/:id', projectController.deleteProject.bind(projectController));

export default router;
