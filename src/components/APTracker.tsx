interface APTrackerProps {
  totalEarnable: number;
  apSpent: number;
  availableAP: number;
}

export default function APTracker({ totalEarnable, apSpent, availableAP }: APTrackerProps) {
  const percentageUsed = totalEarnable > 0 ? (apSpent / totalEarnable) * 100 : 0;

  return (
    <div className="bg-[#2a2a2a] rounded-xl shadow-lg border border-gray-800 p-6">
      <h3 className="text-lg font-bold text-gray-100 mb-6">AP Consumption</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Total Budget</span>
          <span className="text-2xl font-bold text-gray-100">{totalEarnable}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">AP Spent</span>
          <span className="text-2xl font-bold text-indigo-400">{apSpent}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Remaining</span>
          <span
            className={`text-2xl font-bold ${availableAP > 0 ? 'text-green-400' : 'text-gray-600'
              }`}
          >
            {availableAP}
          </span>
        </div>
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</span>
            <span className="text-xs font-bold text-indigo-400">
              {percentageUsed.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-[#1e1e1e] rounded-full h-2.5 overflow-hidden border border-gray-800">
            <div
              className={`h-full transition-all duration-500 ease-out ${percentageUsed >= 100
                  ? 'bg-green-500'
                  : percentageUsed > 90
                    ? 'bg-amber-500'
                    : 'bg-indigo-600'
                }`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
