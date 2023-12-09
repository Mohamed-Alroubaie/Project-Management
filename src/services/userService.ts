import prisma from '../utils/db';

import { User, Prisma } from '@prisma/client';
import {
  validateUserData,
  CustomUserValidationError,
  isValidEmail,
  sanitizeUserData,
} from '../utils/userValidation';
import logger from '../utils/logger';
import { hashPassword } from '../utils/passwordUtils';

class UserService {
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    try {
      sanitizeUserData(userData);
      await validateUserData(userData);

      const { username, email, password } = userData;

      if (
        typeof username === 'string' &&
        typeof email === 'string' &&
        typeof password === 'string'
      ) {
        const hashedPassword = await hashPassword(password);

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new Error('Email is already in use.');
        }

        return await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
      } else {
        throw new Error('Missing user data.');
      }
    } catch (error: any) {
      if (error instanceof CustomUserValidationError) {
        throw error;
      }
      logger.error(`Error creating user: ${error}`);
      throw new Error('Failed to create user.');
    }
  }

  async updateUser(
    userId: string,
    userData: Prisma.UserUpdateInput
  ): Promise<User | null> {
    try {
      sanitizeUserData(userData);
      await validateUserData(userData);

      const { email, password } = userData;

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new Error('User not found.');
      }

      const dataToUpdate: Prisma.UserUpdateInput = {};

      if (typeof email === 'string' && isValidEmail(email)) {
        dataToUpdate.email = email;
      } else {
        throw new Error('Invalid or missing email.');
      }

      if (typeof password === 'string') {
        const hashedPassword = await hashPassword(password);
        dataToUpdate.password = hashedPassword;
      }

      return await prisma.user.update({
        where: { id: userId },
        data: dataToUpdate,
      });
    } catch (error: any) {
      if (error instanceof CustomUserValidationError) {
        throw error;
      }
      logger.error(`Error updating user with ID ${userId}: ${error}`);
      throw new Error(`Failed to update user with ID ${userId}.`);
    }
  }

  async deleteUser(userId: string): Promise<User | null> {
    try {
      return await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error: any) {
      logger.error(`Error deleting user with ID ${userId}: ${error}`);
      throw new Error(`Failed to delete user with ID ${userId}.`);
    }
  }
}

export default UserService;
