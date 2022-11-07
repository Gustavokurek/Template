import { getRepository, Repository } from 'typeorm';

import { ICreatedUsersDTO } from '@modules/accounts/repositories/dtos/ICreatedUsersDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  async create({ name, email, password }: ICreatedUsersDTO): Promise<void> {
    const user = this.repository.create({ name, email, password });
    this.repository.save(user);
  }
}
