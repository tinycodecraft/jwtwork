import axios, { type AxiosInstance } from 'axios';
import { BASEURL } from '../config';

/**
 * Service API base class - configures default settings/error handling for inheriting class
 */
export abstract class BaseService {
  protected readonly $http: AxiosInstance;
  protected readonly $wAuthHttp: AxiosInstance;

  protected constructor(controller: string, timeout  = 50000) {
    this.$http = axios.create({
      timeout,
      baseURL: `${BASEURL}/api/${controller}/`
    });
    this.$wAuthHttp = axios.create({
      timeout,
      baseURL: `${BASEURL}/api/${controller}/`,
      withCredentials: true,
    });
  }
}
