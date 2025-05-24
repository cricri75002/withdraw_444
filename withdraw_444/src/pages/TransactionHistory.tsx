import React, { useState, useEffect } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import TransactionItem from '../components/TransactionItem';

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      description: 'Cash Withdrawal',
      amount: -500,
      date: new Date(Date.now() - 86400000),
      status: 'completed',
      type: 'withdrawal'
    },
    {
      id: '2',
      description: 'Deposit',
      amount: 1200,
      date: new Date(Date.now() - 86400000 * 2),
      status: 'completed',
      type: 'deposit'
    },
    {
      id: '3',
      description: 'Cash Withdrawal',
      amount: -200,
      date: new Date(Date.now() - 86400000 * 5),
      status: 'completed',
      type: 'withdrawal'
    },
    {
      id: '4',
      description: 'Transfer Received',
      amount: 350,
      date: new Date(Date.now() - 86400000 * 7),
      status: 'completed',
      type: 'deposit'
    },
    {
      id: '5',
      description: 'Cash Withdrawal',
      amount: -700,
      date: new Date(Date.now() - 86400000 * 10),
      status: 'completed',
      type: 'withdrawal'
    },
    {
      id: '6',
      description: 'Deposit',
      amount: 2000,
      date: new Date(Date.now() - 86400000 * 15),
      status: 'completed',
      type: 'deposit'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  
  const filterTransactions = () => {
    let filtered = [...transactions];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }
    
    // Sort by date
    filtered.sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.date.getTime() - a.date.getTime();
      } else {
        return a.date.getTime() - b.date.getTime();
      }
    });
    
    return filtered;
  };
  
  const filteredTransactions = filterTransactions();
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <button 
          className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-all"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search transactions..."
            />
          </div>
          
          <div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center justify-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-all"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="deposit">Deposits</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="space-y-2">
            {filteredTransactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
            </div>
            <p className="text-gray-500">No transactions found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;