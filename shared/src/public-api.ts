/**
 * @skv/shared — Public API
 *
 * This library is shared as a singleton across the shell and all remote
 * micro frontends via Native Federation. Services marked with
 * `providedIn: 'root'` will have a single instance at runtime.
 */

export { AuthService } from './lib/auth.service';
export type { User } from './lib/user.model';
