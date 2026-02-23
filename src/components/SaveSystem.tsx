import { useState } from 'react';
import { Upload, Copy, Check } from 'lucide-react';
import { ArchetypeCaps, ArchetypeName, BuildState, EconomySettings } from '../types';

interface SaveData {
    archetypeCaps: ArchetypeCaps;
    selectedArchetype: ArchetypeName;
    selectedCapArchetype: ArchetypeName;
    build: BuildState;
    economy: EconomySettings;
    version: string;
}

interface SaveSystemProps {
    data: SaveData;
    onImport: (data: SaveData) => void;
}

export default function SaveSystem({ data, onImport }: SaveSystemProps) {
    const [importString, setImportString] = useState('');
    const [showImport, setShowImport] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const exportData = () => {
        const jsonString = JSON.stringify(data);
        const base64String = btoa(jsonString);
        return base64String;
    };

    const handleCopy = () => {
        const dataString = exportData();
        navigator.clipboard.writeText(dataString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImport = () => {
        try {
            setError(null);
            const jsonString = atob(importString.trim());
            const parsedData = JSON.parse(jsonString) as SaveData;

            // Basic validation
            if (!parsedData.archetypeCaps || !parsedData.build || !parsedData.economy) {
                throw new Error('Invalid save data format');
            }

            onImport(parsedData);
            setImportString('');
            setShowImport(false);
        } catch (err) {
            setError('Invalid simulation string. Please check and try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Save & Share Simulator</h2>
                    <p className="text-sm text-gray-500">Export your current simulation or import one from others</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied!' : 'Export to Clipboard'}
                    </button>
                    <button
                        onClick={() => setShowImport(!showImport)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
                    >
                        <Upload size={18} />
                        Import String
                    </button>
                </div>
            </div>

            {showImport && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Paste Simulation String
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={importString}
                            onChange={(e) => setImportString(e.target.value)}
                            placeholder="Paste the base64 string here..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleImport}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
            )}
        </div>
    );
}
