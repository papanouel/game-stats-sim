import { StatCaps, ArchetypeName } from '../types';
import { STAT_NAMES, STAT_DISPLAY_NAMES } from '../constants';
import { calculateTotalAPCost } from '../utils/calculations';

interface ArchetypeCapEditorProps {
  archetypeName: ArchetypeName;
  caps: StatCaps;
  onCapsChange: (archetypeName: ArchetypeName, caps: StatCaps) => void;
}

export default function ArchetypeCapEditor({
  archetypeName,
  caps,
  onCapsChange,
}: ArchetypeCapEditorProps) {
  const handleCapChange = (stat: string, value: number) => {
    const newCaps = { ...caps, [stat]: Math.max(0, Math.min(10, value)) };
    onCapsChange(archetypeName, newCaps);
  };

  const totalCost = calculateTotalAPCost(caps);

  return (
    <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 p-6">
      <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-100 capitalize border-b-2 border-indigo-500 pb-1">{archetypeName} Potential</h3>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <span className="text-gray-500">
            Total Points: <span className="text-indigo-400">{totalCost}</span>
          </span>
          <span className="text-gray-500">
            AP Weight: <span className="text-indigo-400">{totalCost}</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {STAT_NAMES.map(stat => (
          <div key={stat} className="flex items-center justify-between gap-3 p-3 bg-[#2a2a2a] rounded-lg border border-gray-800/50">
            <label className="text-sm font-semibold text-gray-400 flex-1">
              {STAT_DISPLAY_NAMES[stat]}
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={caps[stat] || 0}
              onChange={(e) => handleCapChange(stat, parseInt(e.target.value) || 0)}
              className="w-16 px-3 py-1.5 text-sm bg-[#1e1e1e] border border-gray-700 rounded-lg text-gray-200 font-bold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
