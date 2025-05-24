
import { useState } from 'react';
import QRCode from 'react-qr-code';

const NFCButton = () => {
  const [token, setToken] = useState(''</>);

  const generateToken = async () => {
    const res = await fetch('/api/payment/generate-token'</>);
    const data = await res.json(</>);
    setToken(data.token</>);
  };

  return (<><NFCButton />
    <div className="my-4">
      <button onClick={generateToken} className="p-2 bg-green-600 text-white rounded">
        Générer un token NFC
      </button>
      {token && (
        <div className="mt-4">
          <p className="mb-2">Token de paiement NFC :</p>
          <QRCode value={token} />
        </div>
      )}
    </div>
  </>);
};


import QRCode from 'react-qr-code';
import { PlaidLink } from 'react-plaid-link';
import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLinkButton = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null</>);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/plaid/create_link_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }</>);
      const data = await response.json(</>);
      setLinkToken(data.link_token</>);
    };
    createLinkToken(</>);
  }, []</>);

  const onSuccess = async (public_token: string) => {
    await fetch('/api/plaid/exchange_public_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token }),
    }</>);
    alert('Bank account connected!'</>);
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess,
  }</>);

  return (<><NFCButton />
    <button onClick={() => open()} disabled={!ready || !linkToken} className="p-2 bg-blue-600 text-white rounded">
      Connecter un compte bancaire
    </button>
  </>);
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AccountCard from '../components/AccountCard';
import TransactionItem from '../components/TransactionItem';

const Dashboard: React.FC = () => {
  const { user } = useAuth(</>);
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      name: 'Primary Account',
      balance: 12500.65,
      currency: 'USD',
      lastTransaction: new Date(),
      type: 'checking'
    },
    {
      id: '2',
      name: 'Savings Account',
      balance: 45780.20,
      currency: 'USD',
      lastTransaction: new Date(Date.now() - 86400000 * 2),
      type: 'savings'
    }
  ]</>);
  
  const [recentTransactions, setRecentTransactions] = useState([
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
    }
  ]</>);
  
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]</>);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0</>);
  
  return (<><NFCButton />
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Here's your financial overview</p>
          </div>
          <Link 
            to="/withdraw" 
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
          >
            <CreditCard size={18} />
            <span>Withdraw Cash</span>
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl p-6 mb-6">
          <div className="text-blue-100 mb-2">Total Balance</div>
          <div className="text-3xl font-bold text-white mb-4">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1 bg-blue-700 bg-opacity-50 rounded-lg px-3 py-1">
              <TrendingUp size={16} className="text-green-300" />
              <span className="text-white text-sm">Income: $1,200.00</span>
            </div>
            <div className="flex items-center space-x-1 bg-blue-700 bg-opacity-50 rounded-lg px-3 py-1">
              <TrendingDown size={16} className="text-red-300" />
              <span className="text-white text-sm">Expenses: $700.00</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <AccountCard 
              key={account.id} 
              account={account} 
              isSelected={selectedAccount.id === account.id}
              onClick={() => setSelectedAccount(account)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <Link to="/history" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>View all</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <Link to="/withdraw" className="block w-full bg-blue-50 hover:bg-blue-100 text-blue-800 p-4 rounded-lg transition-all">
              <div className="flex items-center">
                <div className="mr-4 bg-blue-100 p-3 rounded-lg">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Withdraw Cash</h3>
                  <p className="text-sm text-gray-600">Withdraw from your account</p>
                </div>
              </div>
            </Link>
            
            <div className="block w-full bg-green-50 hover:bg-green-100 text-green-800 p-4 rounded-lg transition-all cursor-pointer">
              <div className="flex items-center">
                <div className="mr-4 bg-green-100 p-3 rounded-lg">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Deposit Funds</h3>
                  <p className="text-sm text-gray-600">Add money to your account</p>
                </div>
              </div>
            </div>
            
            <div className="block w-full bg-purple-50 hover:bg-purple-100 text-purple-800 p-4 rounded-lg transition-all cursor-pointer">
              <div className="flex items-center">
                <div className="mr-4 bg-purple-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                    <path d="M3 7h18"></path>
                    <path d="M8 5V3"></path>
                    <path d="M16 5V3"></path>
                    <path d="M8 15h8"></path>
                    <path d="M8 19h5"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Schedule Payment</h3>
                  <p className="text-sm text-gray-600">Set up recurring withdrawals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default Dashboard;