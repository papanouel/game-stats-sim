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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">AP Economy Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial AP Budget
          </label>
          <input
            type="number"
            min="0"
            value={economy.initialAP}
            onChange={(e) => handleChange('initialAP', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level-Up Rewards AP
          </label>
          <input
            type="number"
            min="0"
            value={economy.levelUpAP}
            onChange={(e) => handleChange('levelUpAP', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Rewards AP
          </label>
          <input
            type="number"
            min="0"
            value={economy.extraAP}
            onChange={(e) => handleChange('extraAP', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col justify-end">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Earnable AP
          </label>
          <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-900">
            {totalEarnable}
          </div>
        </div>
      </div>
    </div>
  );
}
