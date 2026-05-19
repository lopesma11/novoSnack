import {
  LoginDTO,
  LoginResponseDTO,
  LoginUseCase,
} from "../../../application/use-cases/auth/login";
import { Request, Response, NextFunction } from "express";

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<LoginResponseDTO>;
}

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handleLogin(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email, password } = request.body;

      const userToken = await this.loginUseCase.execute({ email, password });

      return response.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  }
}
