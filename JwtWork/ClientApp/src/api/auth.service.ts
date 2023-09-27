import { BaseService } from './base.service';
import type { AxiosResponse } from 'axios';
import { type Credentials,type AuthUser, type RefreshTokenState, type TokenState } from 'src/fragments/types';

/**
 * Auth API abstraction layer communication via Axios (typescript singleton pattern)
 */
class AuthService extends BaseService {
  private static _authService: AuthService;
  private static _controller = 'Auth';


  private constructor(name: string) {
    super(name);

  }

  public static get Instance(): AuthService {
    return this._authService || (this._authService = new this(this._controller));
  }

  public async logoutAsync(): Promise<AxiosResponse> {
    return await this.$http.post('Logout');
  }

  public async loginAsync(credentials: Credentials): Promise<AuthUser> {
    const { data } = await this.$http.post<AuthUser>('Login', credentials);
    return data;
  }

  public async getNewTokenAsync(tokenstate:TokenState): Promise<RefreshTokenState> {
    
    const { data } = await this.$http.post<RefreshTokenState>('Renew',tokenstate);
    return data;
  }  
}

export const AuthApi = AuthService.Instance;
