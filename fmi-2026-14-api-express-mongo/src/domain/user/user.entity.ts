import { Entity } from '../common/entity';
import { ValidationException } from '../common/domain-exception';

export type UserRole = 'admin' | 'author' | 'reader';

export interface UserProps {
  username: string;
  password: string; // Hashed password
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  imageUrl: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
    this.validate();
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  public changeRole(newRole: UserRole): void {
    this.props.role = newRole;
    this.validate();
  }

  public updateProfile(firstName: string, lastName: string, imageUrl: string): void {
    this.props.firstName = firstName;
    this.props.lastName = lastName;
    this.props.imageUrl = imageUrl;
    this.validate();
  }

  private validate(): void {
    if (!this.props.username || this.props.username.trim() === '') {
      throw new ValidationException('Username is required.');
    }
    if (!this.props.email || !this.props.email.includes('@')) {
      throw new ValidationException('A valid email is required.');
    }
    if (!this.props.password) {
      throw new ValidationException('Password is required.');
    }
    if (!['admin', 'author', 'reader'].includes(this.props.role)) {
      throw new ValidationException('Invalid user role.');
    }
  }

  public toPlain(): any {
    return {
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      imageUrl: this.imageUrl
    };
  }
}
