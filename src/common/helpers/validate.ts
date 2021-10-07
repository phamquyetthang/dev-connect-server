import Joi, { Schema } from 'joi';
import HttpException from './HttpException';

export function validateRequest<T>(schema: Schema, request: any): Promise<T> {
  const { error, value } = schema.validate(request);
  if (error) {
    throw new HttpException(
      422,
      `validate error: ${error.message}`
    );
  }
  return value;
}
