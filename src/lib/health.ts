import { api } from './api';

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
  timestamp: string;
  version?: string;
}

export const healthCheck = {
  async checkAPI(): Promise<HealthCheckResponse> {
    try {
      const response = await api.get<HealthCheckResponse>('/health');
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Backend API is not responding',
        timestamp: new Date().toISOString(),
      };
    }
  },

  async checkDatabase(): Promise<HealthCheckResponse> {
    try {
      const response = await api.get<HealthCheckResponse>('/health/database');
      return response.data;
    } catch (error: any) {
      return {
        status: 'error',
        message: error.response?.data?.message || 'Database connection failed',
        timestamp: new Date().toISOString(),
      };
    }
  },

  async getSystemStatus(): Promise<{
    api: HealthCheckResponse;
    database: HealthCheckResponse;
    overall: 'healthy' | 'degraded' | 'down';
  }> {
    const [apiStatus, dbStatus] = await Promise.all([
      this.checkAPI(),
      this.checkDatabase(),
    ]);

    let overall: 'healthy' | 'degraded' | 'down' = 'healthy';
    
    if (apiStatus.status === 'error' && dbStatus.status === 'error') {
      overall = 'down';
    } else if (apiStatus.status === 'error' || dbStatus.status === 'error') {
      overall = 'degraded';
    }

    return {
      api: apiStatus,
      database: dbStatus,
      overall,
    };
  },
};
