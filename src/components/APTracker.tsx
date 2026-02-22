interface APTrackerProps {
  totalEarnable: number;
  apSpent: number;
  availableAP: number;
}

export default function APTracker({ totalEarnable, apSpent, availableAP }: APTrackerProps) {
  const percentageUsed = totalEarnable > 0 ? (apSpent / totalEarnable) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">AP Tracking</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Earnable AP</span>
          <span className="text-2xl font-bold text-gray-900">{totalEarnable}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total AP Spent</span>
          <span className="text-2xl font-bold text-blue-600">{apSpent}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">AP Available</span>
          <span
            className={`text-2xl font-bold ${
              availableAP > 0 ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            {availableAP}
          </span>
        </div>
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Budget Usage</span>
            <span className="text-xs font-medium text-gray-700">
              {percentageUsed.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                percentageUsed === 100
                  ? 'bg-green-500'
                  : percentageUsed > 90
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
