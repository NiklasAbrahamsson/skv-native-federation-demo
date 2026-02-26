export interface User {
  id: string;
  displayName: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}
