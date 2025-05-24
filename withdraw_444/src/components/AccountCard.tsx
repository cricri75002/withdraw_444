import React from 'react';
import { CreditCard, TrendingUp } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  lastTransaction: Date;
  type: string;
}

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onClick: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all ${
        isSelected 
          ? 'bg-blue-50 border-2 border-blue-500' 
          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg mr-3 ${account.type === 'checking' ? 'bg-blue-100' : 'bg-green-100'}`}>
          {account.type === 'checking' ? (
            <CreditCard size={20} className="text-blue-600" />
          ) : (
            <TrendingUp size={20} className="text-green-600" />
          )}
        </div>
        <div>
          <p className="text-sm text-gray-500">{account.type === 'checking' ? 'Checking' : 'Savings'}</p>
          <h3 className="font-medium text-gray-900">{account.name}</h3>
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-500">Balance</p>
        <p className="text-xl font-bold text-gray-900">
          ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        Last transaction: {account.lastTransaction.toLocaleDateString()}
      </div>
    </div>
  );
};

export default AccountCard;