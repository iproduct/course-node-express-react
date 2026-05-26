export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EntityNotFoundException extends DomainException {
  constructor(entityName: string, id: string) {
    super(`${entityName} with ID ${id} was not found.`);
    this.name = 'EntityNotFoundException';
  }
}

export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}
