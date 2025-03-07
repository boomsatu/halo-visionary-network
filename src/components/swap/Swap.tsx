
import React, { useState } from "react";
import { ArrowDown, RefreshCw, Settings } from "lucide-react";
import { TOKEN_LIST } from "@/lib/constants";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

const Swap = () => {
  const [fromToken, setFromToken] = useState<Token>(TOKEN_LIST[0]);
  const [toToken, setToToken] = useState<Token>(TOKEN_LIST[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { isConnected, connectWallet } = useWallet();

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (!fromAmount || parseFloat(fromAmount) === 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter an amount to swap",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate a swap for demo purposes
    setTimeout(() => {
      toast({
        title: "Swap Successful",
        description: `Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
      });
      setIsLoading(false);
    }, 2000);
  };

  // Simulate price calculation
  const calculatePrice = (amount: string, from: Token, to: Token) => {
    if (!amount || isNaN(parseFloat(amount))) return "";
    
    // Mock exchange rate (in production this would come from the DEX contract)
    const rates: Record<string, Record<string, number>> = {
      "ETH": { "USDC": 2000, "USDT": 2005, "DAI": 2010 },
      "USDC": { "ETH": 0.0005, "USDT": 1, "DAI": 1.001 },
      "USDT": { "ETH": 0.0005, "USDC": 1, "DAI": 1 },
      "DAI": { "ETH": 0.0005, "USDC": 0.999, "USDT": 1 }
    };
    
    if (from.symbol === to.symbol) return amount;
    
    const rate = rates[from.symbol]?.[to.symbol] || 0;
    return (parseFloat(amount) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculatePrice(value, fromToken, toToken));
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    setFromAmount(calculatePrice(value, toToken, fromToken));
  };

  return (
    <div id="swap" className="relative max-w-lg mx-auto bg-white rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Swap</h2>
        <button 
          onClick={() => setShowSettings(!showSettings)} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Settings size={18} />
        </button>
      </div>
      
      {/* Settings dropdown */}
      {showSettings && (
        <div className="absolute right-6 top-16 bg-white shadow-lg rounded-xl border border-gray-100 p-4 z-10 w-64">
          <h3 className="font-medium mb-3">Slippage Tolerance</h3>
          <div className="flex gap-2 mb-4">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={cn(
                  "px-3 py-1 rounded-lg text-sm",
                  slippage === value
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {value}%
              </button>
            ))}
            <div className="relative flex-grow">
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(parseFloat(e.target.value))}
                className="w-full px-3 py-1 rounded-lg text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">%</span>
            </div>
          </div>
        </div>
      )}
      
      {/* From token */}
      <div className="bg-gray-50 rounded-xl p-4 mb-2">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-500">From</label>
          <span className="text-sm text-gray-500">Balance: 0.00</span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-2xl font-medium focus:outline-none w-full"
          />
          <select
            value={fromToken.symbol}
            onChange={(e) => {
              const selected = TOKEN_LIST.find(t => t.symbol === e.target.value);
              if (selected) {
                setFromToken(selected);
                setToAmount(calculatePrice(fromAmount, selected, toToken));
              }
            }}
            className="min-w-24 bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {TOKEN_LIST.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Switch button */}
      <div className="flex justify-center -my-3">
        <button
          onClick={switchTokens}
          className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
        >
          <ArrowDown size={16} />
        </button>
      </div>
      
      {/* To token */}
      <div className="bg-gray-50 rounded-xl p-4 mt-1 mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-500">To</label>
          <span className="text-sm text-gray-500">Balance: 0.00</span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => handleToAmountChange(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-2xl font-medium focus:outline-none w-full"
          />
          <select
            value={toToken.symbol}
            onChange={(e) => {
              const selected = TOKEN_LIST.find(t => t.symbol === e.target.value);
              if (selected) {
                setToToken(selected);
                setFromAmount(calculatePrice(toAmount, selected, fromToken));
              }
            }}
            className="min-w-24 bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {TOKEN_LIST.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Price info */}
      {fromAmount && toAmount && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Rate</span>
            <span>
              1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-gray-500">Slippage</span>
            <span>{slippage}%</span>
          </div>
        </div>
      )}
      
      {/* Swap button */}
      <button
        onClick={handleSwap}
        disabled={isLoading}
        className="w-full bg-primary text-white font-medium rounded-xl py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {isLoading ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : !isConnected ? (
          "Connect Wallet"
        ) : !fromAmount ? (
          "Enter an amount"
        ) : (
          "Swap"
        )}
      </button>
    </div>
  );
};

export default Swap;
