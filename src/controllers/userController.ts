import { User } from '@prisma/client';
import { Request, Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const newUser = req.body as User;
    try {
      const user = await userService.createUser(newUser);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedFields = req.body as Partial<User>; // Partial<User> to accept partial updates
    try {
      const updatedUser = await userService.updateUser(id, updatedFields);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedUser = await userService.deleteUser(id);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(deletedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
