import { useState, useEffect } from 'react';
import { ArchetypeName, ArchetypeCaps, BuildState, EconomySettings } from './types';
import { DEFAULT_CAPS } from './constants';
import { calculateAPSpent, initializeBuild } from './utils/calculations';
import ArchetypeCapEditor from './components/ArchetypeCapEditor';
import EconomyPanel from './components/EconomyPanel';
import BuildControls from './components/BuildControls';
import APTracker from './components/APTracker';
import RadarChart from './components/RadarChart';
import SaveSystem from './components/SaveSystem';

const SETTINGS_VERSION = '1.2';
const LOCAL_STORAGE_KEY = 'tinyhoopers_sim_settings';

function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img src="icon.png" width="48" height="48" />
            <h1 className="text-4xl font-bold text-gray-900">
              TinyHoopers AP Cost & Cap Simulator
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Define archetype caps, manage AP economy, and build your perfect hooper in real-time
          </p>
        </header>

        <div className="space-y-6">
          <SaveSystem data={currentSaveData} onImport={handleImport} />
          <EconomyPanel economy={economy} onEconomyChange={setEconomy} />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Archetype Cap Templates</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Archetype to Edit
              </label>
              <select
                value={selectedCapArchetype}
                onChange={(e) => setSelectedCapArchetype(e.target.value as ArchetypeName)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {archetypes.map(archetype => (
                  <option key={archetype} value={archetype}>
                    {archetype.charAt(0).toUpperCase() + archetype.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <ArchetypeCapEditor
              archetypeName={selectedCapArchetype}
              caps={archetypeCaps[selectedCapArchetype]}
              onCapsChange={handleCapsChange}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Build Simulator</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Archetype to Build
              </label>
              <div className="flex gap-3">
                {archetypes.map(archetype => (
                  <button
                    key={archetype}
                    onClick={() => handleArchetypeChange(archetype)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedArchetype === archetype
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {archetype.charAt(0).toUpperCase() + archetype.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BuildControls
                  build={build}
                  caps={archetypeCaps[selectedArchetype]}
                  availableAP={availableAP}
                  onBuildChange={setBuild}
                />
              </div>
              <div className="space-y-6">
                <APTracker
                  totalEarnable={totalEarnable}
                  apSpent={apSpent}
                  availableAP={availableAP}
                />
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Visualization</h3>
                  <RadarChart build={build} caps={archetypeCaps[selectedArchetype]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>TinyHoopers Archetype Balance Tool - Real-time AP Cost & Cap Simulator</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
