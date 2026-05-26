import { JSONSchemaType } from 'ajv';

export interface UserLoginInput {
  usernameOrEmail: string;
  passwordHash: string;
}

export const userLoginSchema: JSONSchemaType<UserLoginInput> = {
  type: 'object',
  properties: {
    usernameOrEmail: { type: 'string', minLength: 1 },
    passwordHash: { type: 'string', minLength: 1 },
  },
  required: ['usernameOrEmail', 'passwordHash'],
  additionalProperties: false,
};
