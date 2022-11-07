import { User } from '../infra/typeOrm/entities/User';
import { ICreatedUsersDTO } from './dtos/ICreatedUsersDTO';

export interface IUsersRepository {
  create({ name, email, password }: ICreatedUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
