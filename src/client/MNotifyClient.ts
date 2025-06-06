import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { MNotifyError } from '../errors/MNotifyError';

export interface MNotifyConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
}

export class MNotifyClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly maxRetries: number;

  constructor(config: MNotifyConfig) {
    this.maxRetries = config.maxRetries || 3;
    
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl || "https://api.mnotify.com/api",
      timeout: config.timeout || 100000,
      headers: {
        'Authorization': config.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params:{"key": config.apiKey}
    });
  }

  public async request<T>(config: AxiosRequestConfig, retryCount = 0): Promise<T> {
    try {
      const response: AxiosResponse = await this.axiosInstance(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429 && retryCount < this.maxRetries) {
          const retryAfter = Number.parseInt(error.response.headers['retry-after'] || '1') * 1000;
          await new Promise(resolve => setTimeout(resolve, retryAfter));
          return this.request<T>(config, retryCount + 1);
        }
        
        throw new MNotifyError(
          error.response?.data?.message || error.message,
          error.response?.status || 500,
          error.response?.data
        );
      }
      throw error;
    }
  }
}