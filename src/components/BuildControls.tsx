import { Plus, Minus } from 'lucide-react';
import { BuildState, StatCaps } from '../types';
import { STAT_DISPLAY_NAMES, CATEGORY_STATS } from '../constants';

interface BuildControlsProps {
  build: BuildState;
  caps: StatCaps;
  availableAP: number;
  onBuildChange: (build: BuildState) => void;
}

export default function BuildControls({
  build,
  caps,
  availableAP,
  onBuildChange,
}: BuildControlsProps) {
  const handleIncrement = (stat: string) => {
    const currentValue = build[stat] || 0;
    const maxCap = caps[stat] || 0;

    if (currentValue < maxCap && availableAP > 0) {
      onBuildChange({ ...build, [stat]: currentValue + 1 });
    }
  };

  const handleDecrement = (stat: string) => {
    const currentValue = build[stat] || 0;

    if (currentValue > 0) {
      onBuildChange({ ...build, [stat]: currentValue - 1 });
    }
  };

  const categories = [
    { name: 'Finishing', key: 'finishing' as const },
    { name: 'Creativity', key: 'creativity' as const },
    { name: 'Physicals', key: 'physicals' as const },
    { name: 'Shooting', key: 'shooting' as const },
    { name: 'Defense', key: 'defense' as const },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Stats</h3>
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category.key}>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              {category.name}
            </h4>
            <div className="space-y-2">
              {CATEGORY_STATS[category.key].map(stat => {
                const currentValue = build[stat] || 0;
                const maxCap = caps[stat] || 0;
                const isAtMax = currentValue >= maxCap;
                const isAtMin = currentValue <= 0;
                const canIncrease = !isAtMax && availableAP > 0;

                return (
                  <div
                    key={stat}
                    className="flex items-center justify-between gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 flex-1">
                      {STAT_DISPLAY_NAMES[stat]} (Lvl.)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(stat)}
                        disabled={isAtMin}
                        className={`p-1 rounded transition-colors ${isAtMin
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                      >
                        <Minus size={16} />
                      </button>
                      <div className="flex items-center gap-1 min-w-[60px] justify-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {currentValue}
                        </span>
                        <span className="text-xs text-gray-500">/</span>
                        <span className="text-sm text-gray-600">{maxCap}</span>
                      </div>
                      <button
                        onClick={() => handleIncrement(stat)}
                        disabled={!canIncrease}
                        className={`p-1 rounded transition-colors ${!canIncrease
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
