import prisma from '../utils/db';

import { Project, Prisma } from '@prisma/client';
import {
  validateProjectData,
  CustomValidationError,
} from '../utils/projectValidation';
import logger from '../utils/logger';

class ProjectService {
  async getAllProjects(page = 1, pageSize = 10): Promise<Project[]> {
    try {
      const skip = (page - 1) * pageSize;
      return await prisma.project.findMany({
        skip,
        take: pageSize,
      });
    } catch (error: any) {
      logger.error(`Error fetching projects: ${error}`);
      throw new Error('Unable to fetch projects.');
    }
  }

  async getProjectById(id: string): Promise<Project | null> {
    try {
      return await prisma.project.findUnique({
        where: { id },
      });
    } catch (error: any) {
      logger.error(`Error fetching project by ID ${id}: ${error}`);
      throw new Error(`Unable to fetch project with ID ${id}.`);
    }
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    try {
      await validateProjectData(data);
      return await prisma.project.create({ data });
    } catch (error: any) {
      if (error instanceof CustomValidationError) {
        throw error;
      }
      logger.error(`Error creating project: ${error}`);
      throw new Error('Failed to create project.');
    }
  }

  async updateProject(
    id: string,
    data: Prisma.ProjectUpdateInput
  ): Promise<Project | null> {
    try {
      await validateProjectData(data);
      const existingProject = await prisma.project.findUnique({
        where: { id },
      });
      if (!existingProject) {
        throw new Error('Project not found.');
      }
      return await prisma.project.update({ where: { id }, data });
    } catch (error: any) {
      if (error instanceof CustomValidationError) {
        throw error;
      }
      logger.error(`Error updating project with ID ${id}: ${error}`);
      throw new Error(`Failed to update project with ID ${id}.`);
    }
  }

  async deleteProject(id: string): Promise<Project | null> {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id },
      });
      if (!existingProject) {
        throw new Error('Project not found.');
      }
      return await prisma.project.delete({ where: { id } });
    } catch (error: any) {
      logger.error(`Error deleting project with ID ${id}: ${error}`);
      throw new Error(`Unable to delete project with ID ${id}.`);
    }
  }
}

export default ProjectService;
