import { Injectable, signal, computed } from '@angular/core';
import { User } from './user.model';

/**
 * Mock authentication service shared across shell and all remotes.
 *
 * Because this service uses `providedIn: 'root'` and the @skv/shared
 * package is configured as a singleton in Native Federation, there will
 * be exactly ONE instance at runtime — the shell sets the user and
 * every remote reads the same state.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);

  /** The currently logged-in user (null if not authenticated). */
  readonly currentUser = this._currentUser.asReadonly();

  /** Computed convenience flag. */
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  /** Computed convenience accessor for the display name. */
  readonly displayName = computed(() => this._currentUser()?.displayName ?? '');

  /**
   * Simulate a login. In a real app this would call an OAuth/OIDC endpoint,
   * store tokens, etc. The shell handles this; remotes just read the state.
   */
  login(): void {
    this._currentUser.set({
      id: 'u-1001',
      displayName: 'Anna Svensson',
      email: 'anna.svensson@skatteverket.se',
      role: 'admin',
    });
  }

  /**
   * Simulate a logout.
   */
  logout(): void {
    this._currentUser.set(null);
  }
}
