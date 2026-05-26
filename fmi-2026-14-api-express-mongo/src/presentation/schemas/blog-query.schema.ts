import { JSONSchemaType } from 'ajv';

export interface BlogQueryInput {
  q?: string;
  userId?: string;
  category?: string;
  published?: string;
}

export const blogQuerySchema: JSONSchemaType<BlogQueryInput> = {
  type: 'object',
  properties: {
    q: { type: 'string', nullable: true },
    userId: { type: 'string', nullable: true },
    category: { type: 'string', nullable: true },
    published: { type: 'string', enum: ['true', 'false', ''], nullable: true },
  },
  required: [],
  additionalProperties: true,
};
