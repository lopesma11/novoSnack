import { DomainError } from "./DomainError";

export class InvalidTransitionError extends DomainError {
  constructor(from: string, to: string) {
    super(`Invalid transition: ${from} -> ${to}`, 422);
  }
}
