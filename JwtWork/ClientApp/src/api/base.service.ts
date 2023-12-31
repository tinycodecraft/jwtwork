import axios, { type AxiosInstance } from 'axios'
import { ApiStatusEnum, BASEURL, NUGET_URL_CONFIG } from 'src/config'
import type { RefreshTokenState, TokenState } from 'src/fragments/types'
import { AuthApi } from './auth.service'

/**
 * Service API base class - configures default settings/error handling for inheriting class
 */
export abstract class BaseService {
  protected readonly $http: AxiosInstance
  protected readonly $wAuthHttp: AxiosInstance
  private _token = ''
  private _refreshToken = ''

  get token(): string {
    return this._token
  }
  set token(value: string) {
    this._token = value
  }
  

  get refreshToken(): string {
    return this._refreshToken
  }
  set refreshToken(value: string) {
    this._refreshToken = value
  }

  protected constructor(controller: string, timeout = 50000) {
    this.$http = axios.create({
      timeout,
      baseURL: `${BASEURL}/api/${controller}/`,
    })
    this.$wAuthHttp = axios.create({
      timeout,
      baseURL: `${BASEURL}/api/${controller}/`,
      withCredentials: true,
    })
    this.$wAuthHttp.interceptors.request.use(
      (config) => {

        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }

        return config
      },
      (error) => Promise.reject(error),
    )

    this.$wAuthHttp.interceptors.response.use(
      (response) => response,
      async (error) => {
        const requestConfig = error.config
        if (error.response.status === 401 && !requestConfig._retry) {
          requestConfig._retry = true
        }
        try {
          if ( this.refreshToken) {

            const tokenstate = {Token: this.refreshToken} as TokenState;

            const response = await AuthApi.getNewTokenAsync(tokenstate);
            console.log(`the response from refresh ${response}`)
            if(response && response.status!=ApiStatusEnum.FAILURE)
            {
              this.token = response.newToken  ?? this.token
            }
            
            if (this.token) {
              requestConfig.headers.Authorization = `Bearer ${this.token}`
            }
            return axios(requestConfig)
          }
        } catch (error) {
          console.log(error)
        }
        return Promise.reject(error)
      },
    )
  }
}
