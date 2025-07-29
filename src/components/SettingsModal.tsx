'use client';

import { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '@/hooks/useAuth';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-5');

  if (!user) return null;

  const handleSave = () => {
    // Here you would typically save settings to your backend
    console.log('Settings saved:', {
      notifications,
      emailUpdates,
      darkMode,
      language,
      timezone
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
      <div className="bg-slate-700 rounded-lg -m-6 p-6 text-white">
        <div className="space-y-6">
          {/* Notifications Section */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Push Notifications</label>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Email Updates</label>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailUpdates ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Dark Mode</label>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Language & Region</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="UTC-12">UTC-12 (Baker Island)</option>
                  <option value="UTC-11">UTC-11 (American Samoa)</option>
                  <option value="UTC-10">UTC-10 (Hawaii)</option>
                  <option value="UTC-9">UTC-9 (Alaska)</option>
                  <option value="UTC-8">UTC-8 (Pacific Time)</option>
                  <option value="UTC-7">UTC-7 (Mountain Time)</option>
                  <option value="UTC-6">UTC-6 (Central Time)</option>
                  <option value="UTC-5">UTC-5 (Eastern Time)</option>
                  <option value="UTC-4">UTC-4 (Atlantic Time)</option>
                  <option value="UTC-3">UTC-3 (Argentina)</option>
                  <option value="UTC-2">UTC-2 (South Georgia)</option>
                  <option value="UTC-1">UTC-1 (Azores)</option>
                  <option value="UTC+0">UTC+0 (London)</option>
                  <option value="UTC+1">UTC+1 (Paris)</option>
                  <option value="UTC+2">UTC+2 (Cairo)</option>
                  <option value="UTC+3">UTC+3 (Moscow)</option>
                  <option value="UTC+4">UTC+4 (Dubai)</option>
                  <option value="UTC+5">UTC+5 (Pakistan)</option>
                  <option value="UTC+6">UTC+6 (Bangladesh)</option>
                  <option value="UTC+7">UTC+7 (Bangkok)</option>
                  <option value="UTC+8">UTC+8 (Singapore)</option>
                  <option value="UTC+9">UTC+9 (Tokyo)</option>
                  <option value="UTC+10">UTC+10 (Sydney)</option>
                  <option value="UTC+11">UTC+11 (New Caledonia)</option>
                  <option value="UTC+12">UTC+12 (New Zealand)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Privacy</h3>
            <div className="space-y-3">
              <div className="bg-slate-600 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Data Collection</h4>
                <p className="text-sm text-gray-400 mb-3">
                  We collect minimal data to improve your experience. You can review and delete your data at any time.
                </p>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Privacy Policy
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-600">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-500 text-gray-300 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
