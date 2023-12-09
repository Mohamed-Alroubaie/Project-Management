import { Prisma } from '@prisma/client';
import Joi, { ValidationError as JoiValidationError } from 'joi';

export class CustomValidationError extends Error {
  details: JoiValidationError['details'];

  constructor(message: string, details: JoiValidationError['details']) {
    super(message);
    this.details = details || [];
  }
}

export async function validateProjectData(
  data: Prisma.ProjectCreateInput | Prisma.ProjectUpdateInput
): Promise<void> {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      startDate: Joi.date().required(),
      // Add more validation for other fields
    });

    await schema.validateAsync(data);
  } catch (error) {
    if (error instanceof JoiValidationError) {
      throw new CustomValidationError(
        'Invalid project data.',
        error.details || []
      );
    } else {
      throw error;
    }
  }
}
