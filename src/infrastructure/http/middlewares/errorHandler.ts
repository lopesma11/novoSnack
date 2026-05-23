import { DomainError } from "../../../domain/errors/DomainError.js";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof DomainError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Internal server error" });
}
