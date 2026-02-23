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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">{archetypeName}</h3>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-600">
            Total Cap Sum: <span className="font-semibold text-gray-900">{totalCost}</span>
          </span>
          <span className="text-gray-600">
            Total AP Cost: <span className="font-semibold text-gray-900">{totalCost}</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {STAT_NAMES.map(stat => (
          <div key={stat} className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded">
            <label className="text-sm font-medium text-gray-700 flex-1">
              {STAT_DISPLAY_NAMES[stat]}
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={caps[stat] || 0}
              onChange={(e) => handleCapChange(stat, parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
