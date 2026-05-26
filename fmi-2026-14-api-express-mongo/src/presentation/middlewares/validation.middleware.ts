import { Request, Response, NextFunction } from 'express';
import Ajv, { Schema } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults: true });
addFormats(ajv);

export function validateBody(schema: Schema) {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction): void => {
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({
        error: 'Validation failed',
        details: validate.errors?.map((err) => ({
          field: err.instancePath ? err.instancePath.substring(1) : err.params.missingProperty,
          message: err.message,
        })),
      });
      return;
    }
    next();
  };
}

export function validateQuery(schema: Schema) {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction): void => {
    const valid = validate(req.query);
    if (!valid) {
      res.status(400).json({
        error: 'Validation failed',
        details: validate.errors?.map((err) => ({
          field: err.instancePath ? err.instancePath.substring(1) : err.params.missingProperty,
          message: err.message,
        })),
      });
      return;
    }
    next();
  };
}
