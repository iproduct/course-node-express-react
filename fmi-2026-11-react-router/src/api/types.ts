export type UserRole = 'admin' | 'author' | 'reader'

export interface User {
  id: string
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  imageUrl: string
}

export interface Blog {
  id: string
  title: string
  content: string
  userId: string
  category: string
  published: boolean
  imageUrl: string
  keywords: string[]
}

export interface BlogFilters {
  q: string
  userId: string
  category: string
  published: string
}
