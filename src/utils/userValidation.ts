import Joi, { ValidationError as JoiValidationError } from 'joi';
import { Prisma } from '@prisma/client';

export class CustomUserValidationError extends Error {
  details: JoiValidationError['details'];

  constructor(message: string, details: JoiValidationError['details']) {
    super(message);
    this.details = details || [];
  }
}

export async function validateUserData(
  data: Prisma.UserCreateInput | Prisma.UserUpdateInput
): Promise<void> {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).trim().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().min(8).trim().required(),
      // Add more validation for other fields
    });

    await schema.validateAsync(data);
  } catch (error) {
    if (error instanceof JoiValidationError) {
      throw new CustomUserValidationError(
        'Invalid user data.',
        error.details || []
      );
    } else {
      throw error;
    }
  }
}

export function sanitizeUserData(
  userData: Prisma.UserCreateInput | Prisma.UserUpdateInput
): void {
  if (typeof userData.username === 'string') {
    userData.username = userData.username.trim();
  }

  if (typeof userData.email === 'string') {
    userData.email = userData.email.trim().toLowerCase();
  }

  if (typeof userData.password === 'string') {
    userData.password = userData.password.trim();
  }

  // Add sanitization for other fields if needed
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
