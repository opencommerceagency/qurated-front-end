import React from 'react';
import {
  Lock,
  User,
  FileText,
  Bell,
  FastForward,
  Shield,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { PageHeader, Card, InfoBanner } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const UserSettingsPage: React.FC = () => {
  const { preferences, updatePreferences, isConnected } = useWorkspace();

  const initials = preferences.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const toggleItems = [
    {
      key: 'showEvidenceSnippets' as const,
      icon: <FileText className="w-4 h-4" />,
      title: 'Show supplier evidence snippets',
      description: 'Keep the cited catalog line beside each suggested product value.',
    },
    {
      key: 'flagLowConfidence' as const,
      icon: <Bell className="w-4 h-4" />,
      title: 'Flag low-confidence records',
      description: 'Call out items below 85% confidence in the work queue and review cards.',
    },
    {
      key: 'autoAdvanceApproved' as const,
      icon: <FastForward className="w-4 h-4" />,
      title: 'Auto-advance after approval',
      description: 'Move focus to the next unverified attribute once a field is signed off.',
    },
    {
      key: 'requireDualCitation' as const,
      icon: <Shield className="w-4 h-4" />,
      title: 'Require citation check on manual edits',
      description: 'Prompt for a source page reference whenever a value is typed manually.',
    },
  ];

  return (
    <div>
      <PageHeader
        kicker="WORKSPACE / PREFERENCES"
        title="Your settings"
        subtitle="Shape your review workflow, choose a reading mode, and update your account."
        action={
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400 mt-6">
            <User className="w-3.5 h-3.5" />
            Personal workspace
          </span>
        }
      />

      <InfoBanner
        icon={<Lock className="w-4 h-4 text-ink-600" />}
        title={isConnected ? 'Synced workspace preferences' : 'Local preview settings'}
        description={
          isConnected
            ? 'Changes are saved directly to your connected workspace profile.'
            : 'Changes are stored in this browser only; no live account or workspace preferences are updated.'
        }
      />

      {/* Account Profile Card */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#E5DFD3] text-[#1D2621] font-serif text-lg flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-wider uppercase text-ink-400">
                Account profile
              </div>
              <div className="font-serif text-2xl text-ink-900 mt-0.5">
                {preferences.displayName}
              </div>
              <div className="text-xs text-ink-600 mt-0.5">{preferences.email}</div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1.5">
                  Display name
                </label>
                <input
                  type="text"
                  value={preferences.displayName}
                  onChange={(e) => updatePreferences({ displayName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-line bg-card text-ink-900 focus:outline-none focus:border-sage-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  value={preferences.email}
                  onChange={(e) => updatePreferences({ email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-line bg-card text-ink-900 focus:outline-none focus:border-sage-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-900 mb-1.5">
                Workspace role
              </label>
              <div className="px-3.5 py-2.5 rounded-xl border border-line bg-well flex items-center justify-between text-xs">
                <span className="text-ink-600">{preferences.role}</span>
                <span className="font-mono text-[10px] tracking-wider uppercase text-ink-400">
                  Managed by workspace admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Split: Workflow Controls + Reading Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] tracking-wider uppercase text-ink-400">
                Review preferences
              </div>
              <h2 className="font-serif text-2xl text-ink-900 mt-0.5">
                Features for your workflow
              </h2>
              <p className="text-xs text-ink-600 mt-0.5">
                Choose which helpers appear while you work through the catalog.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
              04 CONTROLS
            </span>
          </div>

          <div className="divide-y divide-line">
            {toggleItems.map((item) => {
              const checked = preferences[item.key];
              return (
                <div
                  key={item.key}
                  className="py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-well border border-line flex items-center justify-center text-ink-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-ink-900">{item.title}</div>
                      <div className="text-xs text-ink-600 mt-0.5">{item.description}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    onClick={() => updatePreferences({ [item.key]: !checked })}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                      checked ? 'bg-sage-600' : 'bg-line-strong'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-4 p-6 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-ink-400">
              Appearance
            </div>
            <h2 className="font-serif text-2xl text-ink-900 mt-0.5">Reading mode</h2>
            <p className="text-xs text-ink-600 mt-0.5 mb-4">
              Choose the contrast that feels right for long reviews.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updatePreferences({ readingMode: 'light' })}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                  preferences.readingMode === 'light'
                    ? 'border-sage-700 bg-sage-50/70'
                    : 'border-line bg-card hover:bg-well'
                }`}
              >
                <Sun className="w-4 h-4 text-ink-600 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-ink-900">Light</div>
                  <div className="text-[11px] text-ink-600">Paper & sage</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => updatePreferences({ readingMode: 'dark' })}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                  preferences.readingMode === 'dark'
                    ? 'border-sage-700 bg-sage-100/20'
                    : 'border-line bg-card hover:bg-well'
                }`}
              >
                <Moon className="w-4 h-4 text-ink-600 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-ink-900">Dark</div>
                  <div className="text-[11px] text-ink-600">Low-light mode</div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-ink-600 mt-6 pt-4 border-t border-line">
            <Sparkles className="w-3.5 h-3.5 text-ink-400 shrink-0 mt-0.5" />
            <span>
              The preview changes immediately; preferences persist across all six workspace screens.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};