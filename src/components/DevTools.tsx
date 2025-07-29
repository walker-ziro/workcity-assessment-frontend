'use client';

import { useState } from 'react';
import { SystemStatus } from './SystemStatus';

export function DevTools() {
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Dev Tools Toggle Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="Development Tools"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Dev Tools Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-40 min-w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Dev Tools</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowSystemStatus(true)}
              className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
            >
              🔍 Check System Status
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
            >
              🔄 Reload App
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full text-left px-3 py-2 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
            >
              🗑️ Clear Local Storage
            </button>

            <div className="pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500 space-y-1">
                <div>API: {process.env.NEXT_PUBLIC_API_URL}</div>
                <div>ENV: {process.env.NEXT_PUBLIC_APP_ENV}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status Modal */}
      {showSystemStatus && (
        <SystemStatus onClose={() => setShowSystemStatus(false)} />
      )}
    </>
  );
}
