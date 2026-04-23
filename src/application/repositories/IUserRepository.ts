export interface IUserRepository {
  login(username: string, password: string): Promise<boolean>;
}
