import { Entity } from '../common/entity';
import { ValidationException } from '../common/domain-exception';

export interface BlogProps {
  title: string;
  content: string;
  userId: string;
  category: string;
  published: boolean;
  imageUrl: string;
  keywords: string[];
}

export class Blog extends Entity<BlogProps> {
  constructor(props: BlogProps, id?: string) {
    super(props, id);
    this.validate();
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get userId(): string {
    return this.props.userId;
  }

  get category(): string {
    return this.props.category;
  }

  get published(): boolean {
    return this.props.published;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  get keywords(): string[] {
    return this.props.keywords;
  }

  public update(props: Partial<Omit<BlogProps, 'userId'>>): void {
    if (props.title !== undefined) this.props.title = props.title;
    if (props.content !== undefined) this.props.content = props.content;
    if (props.category !== undefined) this.props.category = props.category;
    if (props.published !== undefined) this.props.published = props.published;
    if (props.imageUrl !== undefined) this.props.imageUrl = props.imageUrl;
    if (props.keywords !== undefined) this.props.keywords = props.keywords;
    
    this.validate();
  }

  private validate(): void {
    if (!this.props.title || this.props.title.trim() === '') {
      throw new ValidationException('Blog title is required.');
    }
    if (!this.props.content || this.props.content.trim() === '') {
      throw new ValidationException('Blog content is required.');
    }
    if (!this.props.userId || this.props.userId.trim() === '') {
      throw new ValidationException('Blog author ID is required.');
    }
    if (!this.props.category || this.props.category.trim() === '') {
      throw new ValidationException('Blog category is required.');
    }
    if (!Array.isArray(this.props.keywords)) {
      throw new ValidationException('Keywords must be an array of strings.');
    }
  }

  public toPlain(): any {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      userId: this.userId,
      category: this.category,
      published: this.published,
      imageUrl: this.imageUrl,
      keywords: this.keywords
    };
  }
}
