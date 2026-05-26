import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { UserModel, IUserDocument } from '../db/schemas/user.schema';

export class MongoUserRepository implements IUserRepository {
  private toDomain(doc: IUserDocument): User {
    return new User(
      {
        username: doc.username,
        password: doc.passwordHash,
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        role: doc.role as any,
        imageUrl: doc.imageUrl,
      },
      doc._id
    );
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).exec();
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() }).exec();
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByUsername(username: string): Promise<User | null> {
    const doc = await UserModel.findOne({ username }).exec();
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async save(user: User): Promise<void> {
    await UserModel.findByIdAndUpdate(
      user.id,
      {
        _id: user.id,
        username: user.username,
        passwordHash: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email.toLowerCase(),
        role: user.role,
        imageUrl: user.imageUrl,
      },
      { upsert: true, new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }
}
