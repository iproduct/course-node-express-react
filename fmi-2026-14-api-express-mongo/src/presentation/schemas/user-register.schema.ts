import { JSONSchemaType } from 'ajv';

export interface UserRegisterInput {
  username: string;
  email: string;
  passwordHash: string; // Map frontend password field to use-case
  firstName: string;
  lastName: string;
  role: 'admin' | 'author' | 'reader';
  imageUrl?: string;
}

export const userRegisterSchema: JSONSchemaType<UserRegisterInput> = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3, maxLength: 30 },
    email: { type: 'string', format: 'email' },
    passwordHash: { type: 'string', minLength: 6 },
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    role: { type: 'string', enum: ['admin', 'author', 'reader'] },
    imageUrl: { type: 'string', nullable: true },
  },
  required: ['username', 'email', 'passwordHash', 'firstName', 'lastName', 'role'],
  additionalProperties: false,
};
