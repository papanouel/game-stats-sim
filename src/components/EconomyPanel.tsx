import { EconomySettings } from '../types';

interface EconomyPanelProps {
  economy: EconomySettings;
  onEconomyChange: (economy: EconomySettings) => void;
}

export default function EconomyPanel({ economy, onEconomyChange }: EconomyPanelProps) {
  const totalEarnable = economy.initialAP + economy.extraAP + economy.levelUpAP;

  const handleChange = (field: keyof EconomySettings, value: number) => {
    onEconomyChange({ ...economy, [field]: Math.max(0, value) });
  };

  return (
    <div className="bg-[#2a2a2a] rounded-xl shadow-lg border border-gray-800 p-6">
      <h3 className="text-lg font-bold text-gray-100 mb-6">AP Economy Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-2">
            Initial AP Budget
          </label>
          <input
            type="number"
            min="0"
            value={economy.initialAP}
            onChange={(e) => handleChange('initialAP', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-2">
            Level-Up Rewards
          </label>
          <input
            type="number"
            min="0"
            value={economy.levelUpAP}
            onChange={(e) => handleChange('levelUpAP', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-400 mb-2">
            Extra Bonuses
          </label>
          <input
            type="number"
            min="0"
            value={economy.extraAP}
            onChange={(e) => handleChange('extraAP', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col justify-end">
          <label className="block text-sm font-semibold text-gray-400 mb-2">
            Total Available AP
          </label>
          <div className="px-3 py-2 bg-indigo-900/30 border border-indigo-500/30 rounded-lg font-bold text-indigo-400 text-center">
            {totalEarnable}
          </div>
        </div>
      </div>
    </div>
  );
}
