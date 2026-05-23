import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith("Bearer")) {
    response.status(401).json({ message: "Token is not defined" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    response.status(500).json({ message: "Settings invalid to server" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as { sub: string; name: string };

    request.user = decoded;

    next();
  } catch {
    response.status(401).json({ message: "Invalid token or expired" });
  }
}
