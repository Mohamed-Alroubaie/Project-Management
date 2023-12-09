import Joi, { ValidationError as JoiValidationError } from 'joi';
import { Prisma } from '@prisma/client';

export class CustomTaskValidationError extends Error {
  details: JoiValidationError['details'];

  constructor(message: string, details: JoiValidationError['details']) {
    super(message);
    this.details = details || [];
  }
}

export async function validateTaskData(
  data: Prisma.TaskCreateInput | Prisma.TaskUpdateInput
): Promise<void> {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      // Add more validation for other fields
    });

    await schema.validateAsync(data);
  } catch (error) {
    if (error instanceof JoiValidationError) {
      throw new CustomTaskValidationError(
        'Invalid task data.',
        error.details || []
      );
    } else {
      throw error;
    }
  }
}
