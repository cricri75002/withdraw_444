import React from 'react';
import { TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  status: string;
  type: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isNegative = transaction.amount < 0;
  
  const getIcon = () => {
    switch (transaction.type) {
      case 'withdrawal':
        return (
          <div className="p-2 rounded-lg bg-red-100">
            <CreditCard size={20} className="text-red-500" />
          </div>
        );
      case 'deposit':
        return (
          <div className="p-2 rounded-lg bg-green-100">
            <TrendingUp size={20} className="text-green-500" />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-lg bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <path d="M12 22V8"></path>
              <path d="m19 15-7-7-7 7"></path>
              <path d="M5 22h14"></path>
            </svg>
          </div>
        );
    }
  };
  
  return (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="mr-4">
        {getIcon()}
      </div>
      
      <div className="flex-grow">
        <p className="font-medium text-gray-900">{transaction.description}</p>
        <p className="text-xs text-gray-500">
          {transaction.date.toLocaleDateString()} • {transaction.status}
        </p>
      </div>
      
      <div className={`font-bold ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
        {isNegative ? '-' : '+'} ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default TransactionItem;