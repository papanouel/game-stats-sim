import { useState } from 'react';
import { Upload, Copy, Check, Info } from 'lucide-react';
import logo from '../assets/icon.png';
import { ArchetypeCaps, ArchetypeName, BuildState, EconomySettings } from '../types';

interface SaveData {
    archetypeCaps: ArchetypeCaps;
    selectedArchetype: ArchetypeName;
    selectedCapArchetype: ArchetypeName;
    build: BuildState;
    economy: EconomySettings;
    version: string;
}

interface TopBarProps {
    data: SaveData;
    onImport: (data: SaveData) => void;
}

export default function TopBar({ data, onImport }: TopBarProps) {
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

            if (!parsedData.archetypeCaps || !parsedData.build || !parsedData.economy) {
                throw new Error('Invalid save data format');
            }

            onImport(parsedData);
            setImportString('');
            setShowImport(false);
        } catch (err) {
            setError('Invalid simulation string.');
        }
    };

    return (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={logo} width="32" height="32" alt="Logo" />
                    <h1 className="text-xl font-bold text-gray-900 hidden md:block">
                        Game Stats <span className="text-blue-600">Sim</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowImport(!showImport)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Upload size={16} />
                        Import
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-shadow shadow-sm"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Export'}
                    </button>
                </div>
            </div>

            {showImport && (
                <div className="absolute top-full right-6 mt-2 w-96 p-4 bg-white rounded-xl shadow-xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
                    <div className="mb-3 flex items-center gap-2">
                        <Info size={16} className="text-blue-500" />
                        <span className="text-sm font-semibold text-gray-900">Import Configuration</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <textarea
                            value={importString}
                            onChange={(e) => setImportString(e.target.value)}
                            placeholder="Paste your Base64 string here..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowImport(false)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                    {error && <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>}
                </div>
            )}
        </div>
    );
}
