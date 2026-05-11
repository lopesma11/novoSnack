export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}
