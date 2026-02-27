/**
 * User data shape matching the @skv/shared User interface.
 * Kept as a plain interface so the React sub-app doesn't need
 * to depend on Angular's DI system — it receives user data
 * as serialised JSON via Custom Element attributes instead.
 */
export interface UserData {
  id: string;
  displayName: string;
  email: string;
  role: string;
}
