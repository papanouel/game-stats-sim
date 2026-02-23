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
    <div className="bg-[#2a2a2a] rounded-xl shadow-lg border border-gray-800 p-6">
      <h3 className="text-lg font-bold text-gray-100 mb-6">Attribute Allocation</h3>
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category.key}>
            <h4 className="text-xs font-bold text-indigo-400 mb-3 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">
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
                    className="flex items-center justify-between gap-3 p-3 bg-[#1e1e1e] rounded-lg border border-gray-800 hover:border-gray-700 transition-all group"
                  >
                    <span className="text-sm font-medium text-gray-300 flex-1">
                      {STAT_DISPLAY_NAMES[stat]}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecrement(stat)}
                        disabled={isAtMin}
                        className={`p-1.5 rounded-lg transition-all ${isAtMin
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                          : 'bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white'
                          }`}
                      >
                        <Minus size={14} />
                      </button>
                      <div className="flex items-center gap-1.5 min-w-[70px] justify-center bg-[#2a2a2a] py-1 px-2 rounded border border-gray-700">
                        <span className={`text-sm font-bold ${isAtMax ? 'text-indigo-400' : 'text-gray-100'}`}>
                          {currentValue}
                        </span>
                        <span className="text-xs text-gray-600">/</span>
                        <span className="text-sm text-gray-400 font-medium">{maxCap}</span>
                      </div>
                      <button
                        onClick={() => handleIncrement(stat)}
                        disabled={!canIncrease}
                        className={`p-1.5 rounded-lg transition-all ${!canIncrease
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                          : 'bg-green-900/20 text-green-500 hover:bg-green-500 hover:text-white'
                          }`}
                      >
                        <Plus size={14} />
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
