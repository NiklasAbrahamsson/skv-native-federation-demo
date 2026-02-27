/**
 * User data shape matching the @skv/shared User interface.
 * Kept in a plain .ts file so it can be imported from both
 * .vue and .ts files without issues.
 */
export interface UserData {
  id: string;
  displayName: string;
  email: string;
  role: string;
}
