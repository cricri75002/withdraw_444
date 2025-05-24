import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronDown, CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('Primary Account');
  const [showAccounts, setShowAccounts] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawalCode, setWithdrawalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('atm');
  const [transactionType, setTransactionType] = useState('withdraw');
  const [isNfcSupported, setIsNfcSupported] = useState(false);
  const [isNfcReading, setIsNfcReading] = useState(false);
  
  useEffect(() => {
    // Check if NFC is supported
    if ('NDEFReader' in window) {
      setIsNfcSupported(true);
    }
  }, []);

  const startNfcPayment = async () => {
    if (!isNfcSupported) {
      toast.error('NFC is not supported on your device');
      return;
    }

    try {
      setIsNfcReading(true);
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      
      ndef.addEventListener("reading", ({ message }: any) => {
        setIsNfcReading(false);
        handleConfirm();
      });

      toast.info('Please tap your NFC card or device');
    } catch (error) {
      console.error(error);
      toast.error('Error accessing NFC. Please ensure NFC is enabled on your device.');
      setIsNfcReading(false);
    }
  };

  const accounts = [
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
  ];
  
  const predefinedAmounts = [100, 200, 500, 1000];
  
  const handleAmountClick = (amt: number) => {
    setAmount(amt.toString());
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };
  
  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (parseFloat(amount) > 2000) {
      toast.error('Maximum limit is $2,000');
      return;
    }
    
    setStep(2);
  };
  
  const handleConfirm = () => {
    if (paymentMethod === 'cb') {
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error('Please fill in all card details');
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid card number');
        return;
      }
      
      if (cvv.length !== 3) {
        toast.error('Please enter a valid CVV');
        return;
      }
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setWithdrawalCode(code);
      setStep(3);
      
      if (transactionType === 'recharge') {
        toast.success(`Successfully recharged card with $${amount}`);
      }
    }, 2000);
  };
  
  const handleDone = () => {
    toast.success(`${transactionType === 'withdraw' ? 'Withdrawal' : 'Recharge'} request completed successfully`);
    navigate('/dashboard');
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {transactionType === 'withdraw' ? 'Withdraw Cash' : 'Recharge Card'}
        </h1>
        <p className="text-gray-600">Follow the steps to complete your transaction</p>
      </div>
      
      <div className="relative mb-10">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <div className="text-center">
            <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 ${
              step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}>
              {step > 1 ? (
                <CheckCircle className="h-6 w-6 text-blue-600" />
              ) : (
                <span className={`text-sm font-bold ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>1</span>
              )}
            </div>
            <div className="text-xs mt-1">Amount</div>
          </div>
          
          <div className="text-center">
            <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 ${
              step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}>
              {step > 2 ? (
                <CheckCircle className="h-6 w-6 text-blue-600" />
              ) : (
                <span className={`text-sm font-bold ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>2</span>
              )}
            </div>
            <div className="text-xs mt-1">Confirm</div>
          </div>
          
          <div className="text-center">
            <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full border-2 ${
              step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
            }`}>
              <span className={`text-sm font-bold ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>3</span>
            </div>
            <div className="text-xs mt-1">Complete</div>
          </div>
        </div>
      </div>
      
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="withdraw"
                  name="transactionType"
                  type="radio"
                  checked={transactionType === 'withdraw'}
                  onChange={() => setTransactionType('withdraw')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="withdraw" className="ml-2 block text-gray-700">
                  Withdraw Cash
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="recharge"
                  name="transactionType"
                  type="radio"
                  checked={transactionType === 'recharge'}
                  onChange={() => setTransactionType('recharge')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="recharge" className="ml-2 block text-gray-700">
                  Recharge Card
                </label>
              </div>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
              Select Account
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setShowAccounts(!showAccounts)}
              >
                <span>{selectedAccount}</span>
                <ChevronDown size={20} className="text-gray-500" />
              </button>
              
              {showAccounts && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200">
                  {accounts.map(account => (
                    <div
                      key={account.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedAccount(account.name);
                        setShowAccounts(false);
                      }}
                    >
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-gray-600">
                        Balance: ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              {transactionType === 'withdraw' ? 'Withdrawal Amount' : 'Recharge Amount'}
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-lg">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-8 pr-12 py-3 text-lg border-gray-300 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Maximum limit: $2,000 per transaction</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Amounts
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {predefinedAmounts.map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountClick(amt)}
                  className={`py-2 border rounded-lg font-medium transition-all ${
                    amount === amt.toString()
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {transactionType === 'withdraw' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="atm"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === 'atm'}
                    onChange={() => setPaymentMethod('atm')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="atm" className="ml-2 block text-gray-700">
                    ATM Withdrawal (Code)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="cb"
                    name="paymentMethod"
                    type="radio"
                    checked={paymentMethod === 'cb'}
                    onChange={() => setPaymentMethod('cb')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="cb" className="ml-2 block text-gray-700">
                    Credit/Debit Card (CB)
                  </label>
                </div>

                {isNfcSupported && user?.nfcEnabled && (
                  <div className="flex items-center">
                    <input
                      id="nfc"
                      name="paymentMethod"
                      type="radio"
                      checked={paymentMethod === 'nfc'}
                      onChange={() => setPaymentMethod('nfc')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="nfc" className="ml-2 flex items-center text-gray-700">
                      <Smartphone size={16} className="mr-1" />
                      NFC Payment
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Available
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="pt-4">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Type</span>
                <span className="font-medium capitalize">{transactionType}</span>
              </div>

              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Account</span>
                <span className="font-medium">{selectedAccount}</span>
              </div>
              
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              
              {transactionType === 'withdraw' && (
                <div className="flex justify-between border-b border-blue-100 pb-2">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium">
                    {paymentMethod === 'atm' ? 'ATM Withdrawal' : paymentMethod === 'nfc' ? 'NFC Payment' : 'CB Payment'}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="text-gray-600">Fee</span>
                <span className="font-medium">$0.00</span>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-blue-700 font-bold">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {(paymentMethod === 'cb' || transactionType === 'recharge') && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    maxLength={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}
          
          {transactionType === 'withdraw' && paymentMethod === 'atm' && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 mr-3">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <div>
                  <h4 className="font-medium text-yellow-800">Important</h4>
                  <p className="text-sm text-yellow-700">
                    Once confirmed, you'll receive a unique code to use at any participating ATM to withdraw your cash.
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'nfc' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <Smartphone size={24} className="text-blue-600 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-800">NFC Payment</h4>
                  <p className="text-sm text-blue-700">
                    Tap your NFC-enabled device or card to complete the payment
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-4 flex space-x-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Back
            </button>
            
            <button
              type="button"
              onClick={paymentMethod === 'nfc' ? startNfcPayment : handleConfirm}
              disabled={isProcessing || isNfcReading}
              className={`w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                (isProcessing || isNfcReading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing || isNfcReading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isNfcReading ? 'Waiting for NFC...' : 'Processing...'}
                </>
              ) : (
                'Confirm Transaction'
              )}
            </button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900">Transaction Approved</h3>
            <p className="text-gray-600 mt-1">Your request has been processed successfully</p>
          </div>
          
          {transactionType === 'withdraw' && paymentMethod === 'atm' && (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-xs mx-auto">
              <p className="text-gray-700 mb-2">Your withdrawal code</p>
              <div className="text-3xl font-bold tracking-wider text-blue-700 flex justify-center space-x-2">
                {withdrawalCode.split('').map((digit, index) => (
                  <span key={index} className="bg-blue-50 border border-blue-200 rounded-lg w-10 h-12 flex items-center justify-center">
                    {digit}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Valid for 24 hours</p>
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-3">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div>
                <h4 className="font-medium text-blue-800">Transaction Details</h4>
                <p className="text-sm text-blue-700">
                  {transactionType === 'withdraw' 
                    ? (paymentMethod === 'atm' 
                      ? 'Visit any participating ATM, select "Cardless Withdrawal", and enter this code to receive your cash.'
                      : paymentMethod === 'nfc'
                      ? 'Your NFC payment has been processed successfully.'
                      : 'Your CB payment has been processed. The amount will be debited from your card.')
                    : 'Your card has been successfully recharged with the specified amount.'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="button"
              onClick={handleDone}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;