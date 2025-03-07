
import React, { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { TOKEN_LIST } from "@/lib/constants";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const mockPools = [
  { token0: TOKEN_LIST[0], token1: TOKEN_LIST[1], liquidity: "$2.5M", apr: "4.2%", myLiquidity: "0.0" },
  { token0: TOKEN_LIST[0], token1: TOKEN_LIST[2], liquidity: "$1.8M", apr: "3.8%", myLiquidity: "0.0" },
  { token0: TOKEN_LIST[1], token1: TOKEN_LIST[3], liquidity: "$950K", apr: "5.1%", myLiquidity: "0.0" },
];

const Pool = () => {
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);
  const [token0, setToken0] = useState(TOKEN_LIST[0]);
  const [token1, setToken1] = useState(TOKEN_LIST[1]);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { isConnected, connectWallet } = useWallet();
  
  const handleAddLiquidity = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    if (!amount0 || !amount1 || parseFloat(amount0) === 0 || parseFloat(amount1) === 0) {
      toast({
        title: "Invalid amounts",
        description: "Please enter valid amounts for both tokens",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate adding liquidity
    setTimeout(() => {
      toast({
        title: "Liquidity Added",
        description: `Added ${amount0} ${token0.symbol} and ${amount1} ${token1.symbol} to the pool`,
      });
      setIsLoading(false);
      setShowAddLiquidity(false);
      setAmount0("");
      setAmount1("");
    }, 2000);
  };

  return (
    <div id="pool" className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Liquidity Pools</h2>
          <button
            onClick={() => setShowAddLiquidity(!showAddLiquidity)}
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            Add Liquidity
          </button>
        </div>

        {showAddLiquidity && (
          <div className="mb-8 bg-gray-50 rounded-xl p-5">
            <h3 className="font-medium mb-4">Add Liquidity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* First token input */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-500">Token 1</label>
                  <span className="text-sm text-gray-500">Balance: 0.00</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount0}
                    onChange={(e) => setAmount0(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-lg font-medium focus:outline-none w-full"
                  />
                  <select
                    value={token0.symbol}
                    onChange={(e) => {
                      const selected = TOKEN_LIST.find(t => t.symbol === e.target.value);
                      if (selected) setToken0(selected);
                    }}
                    className="min-w-24 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {TOKEN_LIST.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Second token input */}
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-500">Token 2</label>
                  <span className="text-sm text-gray-500">Balance: 0.00</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount1}
                    onChange={(e) => setAmount1(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-lg font-medium focus:outline-none w-full"
                  />
                  <select
                    value={token1.symbol}
                    onChange={(e) => {
                      const selected = TOKEN_LIST.find(t => t.symbol === e.target.value);
                      if (selected) setToken1(selected);
                    }}
                    className="min-w-24 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {TOKEN_LIST.filter(t => t.symbol !== token0.symbol).map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAddLiquidity}
              disabled={isLoading}
              className="w-full bg-primary text-white font-medium rounded-xl py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : !isConnected ? (
                "Connect Wallet"
              ) : (
                "Supply"
              )}
            </button>
          </div>
        )}

        {/* Pool List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Pool</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">TVL</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">APR</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">My Liquidity</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {mockPools.map((pool, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                          <img src={pool.token0.logoURI} alt={pool.token0.symbol} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                          <img src={pool.token1.logoURI} alt={pool.token1.symbol} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span className="font-medium">
                        {pool.token0.symbol}/{pool.token1.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium">{pool.liquidity}</td>
                  <td className="py-4 px-4 text-right text-green-600 font-medium">{pool.apr}</td>
                  <td className="py-4 px-4 text-right font-medium">{pool.myLiquidity}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => {
                        setToken0(pool.token0);
                        setToken1(pool.token1);
                        setShowAddLiquidity(true);
                      }}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mockPools.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">No liquidity pools found.</p>
            <button
              onClick={() => setShowAddLiquidity(true)}
              className="mt-4 text-primary font-medium"
            >
              Create a pool
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pool;
