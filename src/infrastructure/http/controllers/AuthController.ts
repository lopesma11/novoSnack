import {
  LoginDTO,
  LoginUseCase,
} from "../../../application/use-cases/auth/login";
import { User } from "../../../domain/entities/user";
import { Request, Response } from "express";

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<User>;
}

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handleLogin(request: Request, response: Response): Promise<void> {
    try {
      const { email, password } = request.body;

      const userToken = await this.loginUseCase.execute({ email, password });

      return response.status(200).json(userToken);
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        return response.status(401).json({ message: "Invalid credentials" });
      }
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}
