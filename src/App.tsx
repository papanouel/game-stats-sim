import { useState, useEffect } from 'react';
import { ArchetypeName, ArchetypeCaps, BuildState, EconomySettings } from './types';
import { DEFAULT_CAPS } from './constants';
import { calculateAPSpent, initializeBuild } from './utils/calculations';
import ArchetypeCapEditor from './components/ArchetypeCapEditor';
import EconomyPanel from './components/EconomyPanel';
import BuildControls from './components/BuildControls';
import APTracker from './components/APTracker';
import RadarChart from './components/RadarChart';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';

const SETTINGS_VERSION = '1.2';
const LOCAL_STORAGE_KEY = 'game_stats_sim_settings';

function App() {
  const [activeView, setActiveView] = useState('simulator');
  const [archetypeCaps, setArchetypeCaps] = useState<ArchetypeCaps>(DEFAULT_CAPS);
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeName>('shooter');
  const [selectedCapArchetype, setSelectedCapArchetype] = useState<ArchetypeName>('shooter');
  const [build, setBuild] = useState<BuildState>(initializeBuild());
  const [economy, setEconomy] = useState<EconomySettings>({
    initialAP: 50,
    extraAP: 30,
    levelUpAP: 20,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const jsonString = atob(saved);
        const parsed = JSON.parse(jsonString);
        if (parsed.version === SETTINGS_VERSION) {
          setArchetypeCaps(parsed.archetypeCaps);
          setSelectedArchetype(parsed.selectedArchetype);
          setSelectedCapArchetype(parsed.selectedCapArchetype);
          setBuild(parsed.build);
          setEconomy(parsed.economy);
        }
      } catch (e) {
        console.error('Failed to load saved settings', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isInitialized) return;

    const data = {
      archetypeCaps,
      selectedArchetype,
      selectedCapArchetype,
      build,
      economy,
      version: SETTINGS_VERSION,
    };
    const base64 = btoa(JSON.stringify(data));
    localStorage.setItem(LOCAL_STORAGE_KEY, base64);
  }, [archetypeCaps, selectedArchetype, selectedCapArchetype, build, economy, isInitialized]);

  const handleImport = (data: any) => {
    setArchetypeCaps(data.archetypeCaps);
    setSelectedArchetype(data.selectedArchetype);
    setSelectedCapArchetype(data.selectedCapArchetype);
    setBuild(data.build);
    setEconomy(data.economy);
  };

  const currentSaveData = {
    archetypeCaps,
    selectedArchetype,
    selectedCapArchetype,
    build,
    economy,
    version: SETTINGS_VERSION
  };

  const handleCapsChange = (archetypeName: ArchetypeName, caps: any) => {
    setArchetypeCaps(prev => ({ ...prev, [archetypeName]: caps }));
  };

  const handleArchetypeChange = (archetype: ArchetypeName) => {
    setSelectedArchetype(archetype);
    setBuild(initializeBuild());
  };

  const totalEarnable = economy.initialAP + economy.levelUpAP + economy.extraAP;
  const apSpent = calculateAPSpent(build);
  const availableAP = totalEarnable - apSpent;

  const archetypes: ArchetypeName[] = ['shooter', 'finisher', '3&D', 'defender'];

  const renderContent = () => {
    switch (activeView) {
      case 'economy':
        return (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h2 className="text-2xl font-bold text-gray-900">AP Economy Settings</h2>
              <p className="text-gray-500">Configure total Attribute Points (AP) amount available.</p>
            </header>
            <EconomyPanel economy={economy} onEconomyChange={setEconomy} />
          </div>
        );
      case 'archetypes':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h2 className="text-2xl font-bold text-gray-900">Archetype Potential</h2>
              <p className="text-gray-500">Define the maximum potential for each attribute depending on the archetype.</p>
            </header>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Select Archetype
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {archetypes.map(archetype => (
                      <button
                        key={archetype}
                        onClick={() => setSelectedCapArchetype(archetype)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedCapArchetype === archetype
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {archetype.charAt(0).toUpperCase() + archetype.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <ArchetypeCapEditor
                  archetypeName={selectedCapArchetype}
                  caps={archetypeCaps[selectedCapArchetype]}
                  onCapsChange={handleCapsChange}
                />
              </div>
              <div className="xl:col-span-4 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Potential Radar</h3>
                  <div className="aspect-square">
                    <RadarChart caps={archetypeCaps[selectedCapArchetype]} showCurrent={false} />
                  </div>
                  <p className="mt-4 text-xs text-center text-gray-500 italic">
                    Visual representation of maximum potential for the selected archetype
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'simulator':
      default:
        return (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h2 className="text-2xl font-bold text-gray-900">Build Simulator</h2>
              <p className="text-gray-500">Test builds against available AP and Archetype potential.</p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
                Select Base Archetype
              </label>
              <div className="flex flex-wrap gap-2">
                {archetypes.map(archetype => (
                  <button
                    key={archetype}
                    onClick={() => handleArchetypeChange(archetype)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedArchetype === archetype
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {archetype.charAt(0).toUpperCase() + archetype.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 xl:col-span-8">
                <BuildControls
                  build={build}
                  caps={archetypeCaps[selectedArchetype]}
                  availableAP={availableAP}
                  onBuildChange={setBuild}
                />
              </div>
              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                <APTracker
                  totalEarnable={totalEarnable}
                  apSpent={apSpent}
                  availableAP={availableAP}
                />
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Build Comparison</h3>
                  <div className="aspect-square">
                    <RadarChart build={build} caps={archetypeCaps[selectedArchetype]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <TopBar data={currentSaveData} onImport={handleImport} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
