import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore as useAuthStore } from '../store/useStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  console.log('Profile component rendered. User state:', user);

  useEffect(() => {
    console.log('Profile useEffect running. User state:', user);
    // Check if user is logged in
    if (!user) {
      console.log('User is null, navigating to /auth');
      navigate('/auth');
    } else {
      console.log('User is not null, staying on profile page.', user);
    }
    setIsLoading(false);
  }, [user, navigate]); // Depend on user and navigate

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
            <p className="mt-2 text-gray-600">Welcome to your account</p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 