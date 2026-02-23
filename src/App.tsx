import { useState, useEffect } from 'react';
import { ProfileName, ProfileCaps, BuildState, EconomySettings } from './types';
import { DEFAULT_CAPS } from './constants';
import { calculateAPSpent, initializeBuild } from './utils/calculations';
import ProfileCapEditor from './components/ProfileCapEditor';
import EconomyPanel from './components/EconomyPanel';
import BuildControls from './components/BuildControls';
import APTracker from './components/APTracker';
import RadarChart from './components/RadarChart';
import SaveSystem from './components/SaveSystem';

const SETTINGS_VERSION = '1.1';
const LOCAL_STORAGE_KEY = 'tinyhoopers_sim_settings';

function App() {
  const [profileCaps, setProfileCaps] = useState<ProfileCaps>(DEFAULT_CAPS);
  const [selectedProfile, setSelectedProfile] = useState<ProfileName>('shooter');
  const [selectedCapProfile, setSelectedCapProfile] = useState<ProfileName>('shooter');
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
          setProfileCaps(parsed.profileCaps);
          setSelectedProfile(parsed.selectedProfile);
          setSelectedCapProfile(parsed.selectedCapProfile);
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
      profileCaps,
      selectedProfile,
      selectedCapProfile,
      build,
      economy,
      version: SETTINGS_VERSION,
    };
    const base64 = btoa(JSON.stringify(data));
    localStorage.setItem(LOCAL_STORAGE_KEY, base64);
  }, [profileCaps, selectedProfile, selectedCapProfile, build, economy, isInitialized]);

  const handleImport = (data: any) => {
    setProfileCaps(data.profileCaps);
    setSelectedProfile(data.selectedProfile);
    setSelectedCapProfile(data.selectedCapProfile);
    setBuild(data.build);
    setEconomy(data.economy);
  };

  const currentSaveData = {
    profileCaps,
    selectedProfile,
    selectedCapProfile,
    build,
    economy,
    version: SETTINGS_VERSION
  };

  const handleCapsChange = (profileName: ProfileName, caps: any) => {
    setProfileCaps(prev => ({ ...prev, [profileName]: caps }));
  };

  const handleProfileChange = (profile: ProfileName) => {
    setSelectedProfile(profile);
    setBuild(initializeBuild());
  };

  const totalEarnable = economy.initialAP + economy.levelUpAP + economy.extraAP;
  const apSpent = calculateAPSpent(build);
  const availableAP = totalEarnable - apSpent;

  const profiles: ProfileName[] = ['shooter', 'finisher', '3&D', 'defender'];

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
            Define profile caps, manage AP economy, and build your perfect hooper in real-time
          </p>
        </header>

        <div className="space-y-6">
          <SaveSystem data={currentSaveData} onImport={handleImport} />
          <EconomyPanel economy={economy} onEconomyChange={setEconomy} />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Cap Templates</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Profile to Edit
              </label>
              <select
                value={selectedCapProfile}
                onChange={(e) => setSelectedCapProfile(e.target.value as ProfileName)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {profiles.map(profile => (
                  <option key={profile} value={profile}>
                    {profile.charAt(0).toUpperCase() + profile.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <ProfileCapEditor
              profileName={selectedCapProfile}
              caps={profileCaps[selectedCapProfile]}
              onCapsChange={handleCapsChange}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Build Simulator</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Profile to Build
              </label>
              <div className="flex gap-3">
                {profiles.map(profile => (
                  <button
                    key={profile}
                    onClick={() => handleProfileChange(profile)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedProfile === profile
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {profile.charAt(0).toUpperCase() + profile.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BuildControls
                  build={build}
                  caps={profileCaps[selectedProfile]}
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
                  <RadarChart build={build} caps={profileCaps[selectedProfile]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>TinyHoopers Profile Balance Tool - Real-time AP Cost & Cap Simulator</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
