import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Lock, User, Shield, CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'react-toastify';

const AccountSettings: React.FC = () => {
  const { user, toggleNfc } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  
  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: <User size={20} /> },
    { id: 'security', label: 'Security', icon: <Lock size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'withdrawal', label: 'Payment Settings', icon: <CreditCard size={20} /> },
  ];
  
  const handleSave = () => {
    toast.success('Settings updated successfully');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100">
      <div className="md:grid md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-gray-50 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 rounded-tl-xl rounded-bl-xl">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="md:col-span-3 p-4 md:p-6">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="Christopher"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="Allico"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    defaultValue="123 Main St, Anytown, CA 12345"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {/* Security */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">Enhance your account security by enabling two-factor authentication.</p>
                      <p className="text-sm text-gray-500 mt-1">Status: <span className="text-red-600 font-medium">Disabled</span></p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Enable
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Login Notifications</h3>
                  <div className="flex items-center">
                    <input
                      id="loginNotifications"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="loginNotifications" className="ml-2 block text-gray-700">
                      Receive email notifications for new logins
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="withdrawalEmails"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="withdrawalEmails" className="ml-2 block text-gray-700">
                        Withdrawal confirmations
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="depositEmails"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="depositEmails" className="ml-2 block text-gray-700">
                        Deposit confirmations
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="securityEmails"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="securityEmails" className="ml-2 block text-gray-700">
                        Security alerts
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="promotionalEmails"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="promotionalEmails" className="ml-2 block text-gray-700">
                        Promotional emails and offers
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Push Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="withdrawalPush"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="withdrawalPush" className="ml-2 block text-gray-700">
                        Withdrawal confirmations
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="depositPush"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="depositPush" className="ml-2 block text-gray-700">
                        Deposit confirmations
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="securityPush"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="securityPush" className="ml-2 block text-gray-700">
                        Security alerts
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {/* Withdrawal Settings */}
          {activeTab === 'withdrawal' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Daily Withdrawal Limits</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-600 mr-2" />
                      <p className="text-blue-800">Your current daily withdrawal limit is <span className="font-bold">$2,000</span></p>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="withdrawalLimit" className="block text-sm font-medium text-gray-700 mb-1">
                      Request New Limit
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        id="withdrawalLimit"
                        defaultValue="2000"
                        min="0"
                        step="100"
                        className="flex-1 block w-full rounded-none rounded-r-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">NFC Payments</h3>
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Contactless Payments</p>
                        <p className="text-sm text-gray-500">Enable NFC payments for quick transactions</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user?.nfcEnabled}
                        onChange={toggleNfc}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Preferred Withdrawal Method</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="atmMethod"
                        name="withdrawalMethod"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="atmMethod" className="ml-2 block text-gray-700">
                        ATM (Using withdrawal code)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="bankMethod"
                        name="withdrawalMethod"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="bankMethod" className="ml-2 block text-gray-700">
                        Bank Transfer
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="nfcMethod"
                        name="withdrawalMethod"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="nfcMethod" className="ml-2 block text-gray-700">
                        NFC Payment
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Verification Requirements</h3>
                  <div className="flex items-center">
                    <input
                      id="verification"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="verification" className="ml-2 block text-gray-700">
                      Require additional verification for withdrawals over $1,000
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;