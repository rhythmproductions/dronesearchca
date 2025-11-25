import { useEffect, useState } from 'react';

interface FundingData {
  currentAmount: number;
}

const DEFAULT_FUNDING: FundingData = {
  currentAmount: 0,
};

export function FundingThermometer() {
  const [funding, setFunding] = useState<FundingData>(DEFAULT_FUNDING);

  const GOAL = 12000;
  const STRETCH_GOAL = 15000;

  useEffect(() => {
    // Load funding amount from localStorage
    const stored = localStorage.getItem('fundingAmount');
    if (stored) {
      try {
        setFunding(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse funding amount:', e);
      }
    }

    // Listen for updates from admin panel
    const handleUpdate = (e: CustomEvent<FundingData>) => {
      setFunding(e.detail);
    };

    window.addEventListener('fundingAmountUpdated' as any, handleUpdate as any);
    return () => {
      window.removeEventListener('fundingAmountUpdated' as any, handleUpdate as any);
    };
  }, []);

  const currentAmount = funding.currentAmount;
  
  // Calculate percentages
  const goalPercentage = Math.min((currentAmount / STRETCH_GOAL) * 100, 80); // 80% is where $12K sits
  const stretchPercentage = Math.min((currentAmount / STRETCH_GOAL) * 100, 100);
  
  // Determine fill colors based on amount
  const goalFillPercentage = Math.min((currentAmount / GOAL) * 100, 100);
  const stretchFillPercentage = currentAmount > GOAL ? Math.min(((currentAmount - GOAL) / (STRETCH_GOAL - GOAL)) * 100, 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border-2 border-gray-200">
      <div className="space-y-6">
        {/* Thermometer container */}
        <div className="relative">
          {/* Labels above thermometer */}
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-sm font-semibold text-gray-700">$0</span>
            <span className="text-sm font-semibold text-[#0B2D59]">$12,000 Funding Target</span>
            <span className="text-sm font-semibold text-[#FF6200]">$15,000 Stretch Goal</span>
          </div>

          {/* Thermometer bar */}
          <div className="relative h-12 rounded-full overflow-hidden border-2 border-gray-300">
            {/* Background sections */}
            <div className="absolute inset-0 flex">
              {/* $0-$12K section - faint green background */}
              <div 
                className="bg-green-100"
                style={{ width: '80%' }}
              />
              {/* $12K-$15K section - light gold background */}
              <div 
                className="bg-yellow-100"
                style={{ width: '20%' }}
              />
            </div>

            {/* Filled sections */}
            <div className="absolute inset-0">
              {/* $0-$12K filled - bright green */}
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 transition-all duration-700 ease-out absolute left-0 top-0 bottom-0"
                style={{ width: `${Math.min(goalFillPercentage, 100) * 0.8}%` }}
              />
              {/* $12K-$15K filled - vibrant gold */}
              {stretchFillPercentage > 0 && (
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-700 ease-out absolute top-0 bottom-0"
                  style={{ 
                    left: '80%',
                    width: `${Math.min(stretchFillPercentage, 100) * 0.2}%`
                  }}
                />
              )}
            </div>

            {/* Marker line at $12K */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-[#0B2D59]"
              style={{ left: '80%' }}
            />

            {/* Current amount label inside thermometer */}
            {currentAmount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white drop-shadow-lg">
                  ${currentAmount.toLocaleString()} raised
                </span>
              </div>
            )}
          </div>

          {/* Scale markers below */}
          <div className="flex justify-between items-center mt-1 px-1">
            <div className="w-px"></div>
            <div className="text-center" style={{ marginLeft: '-5%' }}>
              <div className="w-px h-2 bg-[#0B2D59] mx-auto"></div>
            </div>
            <div className="w-px"></div>
          </div>
        </div>

        {/* Progress text */}
        <div className="text-center space-y-2">
          {currentAmount < GOAL && (
            <p className="text-lg font-semibold text-gray-600">
              ${(GOAL - currentAmount).toLocaleString()} remaining to reach funding target
            </p>
          )}
          
          {currentAmount >= GOAL && currentAmount < STRETCH_GOAL && (
            <>
              <p className="text-lg font-semibold text-green-600">
                ✓ Funding target met!
              </p>
              <p className="text-lg font-semibold text-[#FF6200]">
                ${(STRETCH_GOAL - currentAmount).toLocaleString()} remaining to reach stretch goal
              </p>
            </>
          )}
          
          {currentAmount >= STRETCH_GOAL && (
            <>
              <p className="text-lg font-semibold text-[#FF6200]">
                ✓ Stretch Goal met!
              </p>
              <p className="text-lg font-semibold text-gray-600">
                ${(currentAmount - STRETCH_GOAL).toLocaleString()} above stretch goal
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to update funding amount (used by admin panel)
export function updateFundingAmount(amount: number) {
  const data: FundingData = { currentAmount: amount };
  localStorage.setItem('fundingAmount', JSON.stringify(data));
  window.dispatchEvent(
    new CustomEvent('fundingAmountUpdated', { detail: data })
  );
}

// Helper function to get current funding amount
export function getFundingAmount(): number {
  const stored = localStorage.getItem('fundingAmount');
  if (stored) {
    try {
      const data: FundingData = JSON.parse(stored);
      return data.currentAmount;
    } catch (e) {
      return 0;
    }
  }
  return 0;
}
