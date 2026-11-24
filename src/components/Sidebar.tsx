import React from 'react';
import {
  Layers,
  PenLine,
  ShieldCheck,
  FileText,
  GitFork,
  SlidersHorizontal,
  Settings,
  Check,
} from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { ScreenId } from '../types/catalog';
import { useWorkspace } from '../context/WorkspaceContext';

export const Sidebar: React.FC = () => {
  const { activeScreen, setActiveScreen, products, preferences, isConnected } =
    useWorkspace();

  const awaitingCount = products.filter((p) => p.status !== 'Verified').length;
  const isSettings = activeScreen === 'settings';

  const initials = preferences.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'queue',
      label: 'Catalog enrichment queue',
      icon: <Layers className="w-4 h-4" />,
      badge: awaitingCount,
    },
    { id: 'review', label: 'Product enrichment review', icon: <PenLine className="w-4 h-4" /> },
    { id: 'dossier', label: 'Product evidence dossier', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'library', label: 'Enrichment source library', icon: <FileText className="w-4 h-4" /> },
    { id: 'history', label: 'Enrichment run history', icon: <GitFork className="w-4 h-4" /> },
    { id: 'templates', label: 'Webshop templates', icon: <SlidersHorizontal className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-60 bg-sidebar border-r border-line flex flex-col justify-between p-4 shrink-0 min-h-[calc(100vh-3.5rem)]">
      <div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-ink-400 uppercase px-2 mb-3">
          Workspace
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={activeScreen === item.id}
              onClick={() => setActiveScreen(item.id)}
            />
          ))}

          {isSettings && (
            <SidebarNavItem
              icon={<Settings className="w-4 h-4" />}
              label="User settings"
              active={true}
              onClick={() => setActiveScreen('settings')}
            />
          )}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="p-3.5 rounded-xl border border-line bg-canvas/70 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-ink-900 mb-1.5">
            <Check className="w-3.5 h-3.5 text-sage-600" />
            One connected workspace
          </div>
          <p className="text-ink-600 leading-relaxed text-[11px]">
            {isSettings
              ? isConnected
                ? 'Preferences sync automatically with your workspace API.'
                : 'Personal preferences stay in this browser preview.'
              : 'Product fields, source evidence and review decisions stay connected across six screens.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveScreen('settings')}
          className="w-full flex items-center justify-between px-1 py-1.5 rounded-lg hover:bg-black/[0.03] transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E5DFD3] text-[#1D2621] font-serif text-xs flex items-center justify-center">
              {isSettings ? initials : 'Q'}
            </div>
            <div>
              <div className="text-xs font-medium text-ink-900">
                {isSettings ? preferences.displayName : 'Catalog team'}
              </div>
              <div className="text-[11px] text-ink-400">
                {isSettings
                  ? 'Personal settings'
                  : isConnected
                  ? 'Live workspace'
                  : 'Workspace preview'}
              </div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-sage-600" />
        </button>
      </div>
    </aside>
  );
};