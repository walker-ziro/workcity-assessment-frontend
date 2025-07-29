'use client';

import { useState, useEffect } from 'react';
import { healthCheck, HealthCheckResponse } from '@/lib/health';

interface SystemStatusProps {
  onClose?: () => void;
}

export function SystemStatus({ onClose }: SystemStatusProps) {
  const [status, setStatus] = useState<{
    api: HealthCheckResponse;
    database: HealthCheckResponse;
    overall: 'healthy' | 'degraded' | 'down';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setIsLoading(true);
    try {
      const systemStatus = await healthCheck.getSystemStatus();
      setStatus(systemStatus);
    } catch (error) {
      console.error('Failed to check system status:', error);
      setStatus({
        api: {
          status: 'error',
          message: 'Failed to connect to backend',
          timestamp: new Date().toISOString(),
        },
        database: {
          status: 'error',
          message: 'Unable to check database status',
          timestamp: new Date().toISOString(),
        },
        overall: 'down',
      });
    }
    setIsLoading(false);
  };

  const getStatusColor = (status: 'ok' | 'error') => {
    return status === 'ok' ? 'text-green-600' : 'text-red-600';
  };

  const getOverallColor = (overall: 'healthy' | 'degraded' | 'down') => {
    switch (overall) {
      case 'healthy': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Configuration</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">API URL:</span> {apiUrl}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Environment:</span> {process.env.NEXT_PUBLIC_APP_ENV || 'development'}
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Checking system status...</span>
              </div>
            ) : status ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Overall Status</h3>
                  <p className={`text-lg font-semibold ${getOverallColor(status.overall)}`}>
                    {status.overall.charAt(0).toUpperCase() + status.overall.slice(1)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">API Status</h4>
                    <p className={`font-semibold ${getStatusColor(status.api.status)}`}>
                      {status.api.status === 'ok' ? 'Connected' : 'Disconnected'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{status.api.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last checked: {new Date(status.api.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Database Status</h4>
                    <p className={`font-semibold ${getStatusColor(status.database.status)}`}>
                      {status.database.status === 'ok' ? 'Connected' : 'Disconnected'}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{status.database.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Last checked: {new Date(status.database.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={checkStatus}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Checking...' : 'Refresh Status'}
              </button>
              
              {status?.overall === 'down' && (
                <div className="text-sm text-gray-600">
                  <p>💡 <strong>Tip:</strong> Make sure your backend server is running on {apiUrl}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
