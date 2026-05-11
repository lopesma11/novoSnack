export class User {
  readonly userId: string;
  readonly userName: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;

  constructor(
    userId: string,
    userName: string,
    email: string,
    password: string,
    createdAt?: Date,
  ) {
    this.userName = userName;
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt ?? new Date();
  }

  getUserName(): string {
    return this.userName;
  }

  getUserEmail(): string {
    return this.email;
  }

  getUserPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  static restore(
    userId: string,
    userName: string,
    email: string,
    password: string,
    createdAt: Date,
  ): User {
    return new User(userId, userName, email, password, createdAt);
  }
}
