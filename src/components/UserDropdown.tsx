'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  UserCircleIcon, 
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import UserProfileModal from './UserProfileModal';

interface UserDropdownProps {
  className?: string;
}

export default function UserDropdown({ className = '' }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  const handleEditProfile = () => {
    setIsOpen(false);
    setIsProfileModalOpen(true);
  };

  if (!user) return null;

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-gray-50 px-3 py-2 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <UserCircleIcon className="h-6 w-6 text-gray-400" />
          <span className="text-gray-700 font-medium">
            {user.firstName} {user.lastName}
          </span>
          <ChevronDownIcon 
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>

              {/* Menu Items */}
              <button
                onClick={handleEditProfile}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserIcon className="h-4 w-4 mr-3 text-gray-400" />
                Edit Profile
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Cog6ToothIcon className="h-4 w-4 mr-3 text-gray-400" />
                Settings
              </button>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3 text-red-400" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </>
  );
}
