import { LayoutDashboard, Swords, Users } from 'lucide-react';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
    const menuItems = [
        { id: 'economy', label: 'AP Economy', icon: LayoutDashboard },
        { id: 'archetypes', label: 'Archetypes', icon: Users },
        { id: 'simulator', label: 'Build Simulator', icon: Swords },
    ];

    return (
        <div className="w-64 bg-gray-900 h-full flex flex-col border-r border-gray-800">
            <div className="flex-1 py-6 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                }`}
                        >
                            <Icon size={20} />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
