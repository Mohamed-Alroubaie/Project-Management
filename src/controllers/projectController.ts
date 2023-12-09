import { Request, Response } from 'express';
import ProjectService from '../services/projectService';
import { Project } from '@prisma/client';

const projectService = new ProjectService();

class ProjectController {
  async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const project = await projectService.getProjectById(id);
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.status(200).json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProject(req: Request, res: Response): Promise<void> {
    const userId = req.body.userId;
    const newProject = { ...req.body, userId };
    try {
      const project = await projectService.createProject(newProject);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedFields = req.body as Partial<Project>;
    try {
      const updatedProject = await projectService.updateProject(
        id,
        updatedFields
      );
      if (!updatedProject) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.status(200).json(updatedProject);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedProject = await projectService.deleteProject(id);
      if (!deletedProject) {
        res.status(404).json({ message: 'Project not found' });
        return;
      }
      res.status(200).json(deletedProject);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProjectController;
