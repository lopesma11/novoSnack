import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { IUserRepository } from "../../repositories/IUserRepository.js";
import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError.js";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  token: string;
};

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.getUserPassword(),
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        sub: user.userId,
        name: user.userName,
      },
      secret,
      { expiresIn: "24h" },
    );

    return { token };
  }
}
