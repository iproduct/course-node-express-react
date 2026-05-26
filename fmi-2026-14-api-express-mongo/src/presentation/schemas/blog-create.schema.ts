import { JSONSchemaType } from 'ajv';

export interface BlogCreateInput {
  title: string;
  content: string;
  category: string;
  published: boolean;
  imageUrl?: string;
  keywords?: string[];
}

export const blogCreateSchema: JSONSchemaType<BlogCreateInput> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3 },
    content: { type: 'string', minLength: 5 },
    category: { type: 'string', minLength: 1 },
    published: { type: 'boolean' },
    imageUrl: { type: 'string', nullable: true },
    keywords: {
      type: 'array',
      items: { type: 'string' },
      nullable: true,
    },
  },
  required: ['title', 'content', 'category', 'published'],
  additionalProperties: false,
};
export interface BlogUpdateInput {
  title?: string;
  content?: string;
  category?: string;
  published?: boolean;
  imageUrl?: string;
  keywords?: string[];
}

export const blogUpdateSchema: JSONSchemaType<BlogUpdateInput> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3, nullable: true },
    content: { type: 'string', minLength: 5, nullable: true },
    category: { type: 'string', minLength: 1, nullable: true },
    published: { type: 'boolean', nullable: true },
    imageUrl: { type: 'string', nullable: true },
    keywords: {
      type: 'array',
      items: { type: 'string' },
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
