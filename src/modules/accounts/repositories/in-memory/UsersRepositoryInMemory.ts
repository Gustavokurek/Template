import { User } from '@modules/accounts/infra/typeOrm/entities/User';

import { ICreatedUsersDTO } from '../dtos/ICreatedUsersDTO';
import { IUsersRepository } from '../IUsersRepository';

export class UserRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];
  async create({ name, email, password }: ICreatedUsersDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
