import https from 'https';

export interface ClientProps {
  baseUrl: string;
  timeout?: number;
  headers?: any;
  httpsAgent?: https.Agent;
}

export interface IError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
