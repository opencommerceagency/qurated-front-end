import React, { useState } from 'react';
import {
  Archive,
  HardDrive,
  ShieldCheck,
  Search,
  Calendar,
  ArchiveRestore,
  ArrowRight,
  Check,
} from 'lucide-react';
import { PageHeader, Card } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const SourceLibraryPage: React.FC = () => {
  const { sources, toggleArchiveSource, setActiveScreen, isConnected } = useWorkspace();
  const [tab, setTab] = useState<'active' | 'archived'>('archived');
  const [query, setQuery] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);

  const activeSources = sources.filter((s) => s.status === 'active');
  const archivedSources = sources.filter((s) => s.status === 'archived');
  const currentList = tab === 'active' ? activeSources : archivedSources;

  const filtered = currentList.filter((s) =>
    `${s.filename} ${s.supplier} ${s.edition}`.toLowerCase().includes(query.toLowerCase())
  );

  const selectedSource = sources.find((s) => s.id === selectedSourceId);

  return (
    <div>
      <PageHeader
        kicker="ENRICHMENT / REFERENCES"
        title={tab === 'archived' ? 'Source archive' : 'Enrichment source library'}
        subtitle={
          tab === 'archived'
            ? 'Retired supplier files stay searchable for audit and historic evidence, outside new enrichment runs.'
            : 'Active supplier catalogs staged for automated attribute extraction and citation matching.'
        }
        action={
          <button
            type="button"
            onClick={() => setTab(tab === 'archived' ? 'active' : 'archived')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-line bg-card hover:bg-well text-xs font-medium text-ink-900"
          >
            <ArrowRight className="w-3.5 h-3.5 text-ink-600" />
            {tab === 'archived' ? 'Active library' : 'View archive'}
          </button>
        }
      />

      {/* Summary Strip */}
      <div className="rounded-xl border border-line bg-well px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 mb-6 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center">
            <Archive className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-ink-900">
              {currentList.length} files {tab === 'archived' ? 'preserved' : 'active'}
            </div>
            <div className="text-ink-600 text-[11px]">
              {tab === 'archived'
                ? 'Archived files remain available to historic reviews, but are excluded from new runs.'
                : 'Indexed and ready for catalog enrichment runs.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-ink-600 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-ink-400" />
            {tab === 'archived' ? '51.8 MB retained' : '125.2 MB indexed'}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-ink-400" />
            Source history stays connected
          </span>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                tab === 'active'
                  ? 'bg-well border border-line text-ink-900'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Active library
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-well text-ink-600">
                {activeSources.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab('archived')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                tab === 'archived'
                  ? 'bg-well border border-line text-ink-900'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Archive
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-sage-100 text-sage-700">
                {archivedSources.length}
              </span>
            </button>
          </div>

          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400">
            {isConnected ? 'Live repository' : 'Local preview data'}
          </span>
        </div>

        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div className="relative w-80">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${tab === 'archived' ? 'archived' : 'active'} files...`}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-line bg-card text-ink-900 focus:outline-none focus:border-sage-600"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-600">
            <span className="w-2 h-2 rounded-full bg-sage-600" />
            {filtered.length} files in {tab}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-line font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">
                <th className="py-3 px-5 font-medium">File / Edition</th>
                <th className="py-3 px-4 font-medium">
                  {tab === 'archived' ? 'Archived on' : 'Added on'}
                </th>
                <th className="py-3 px-4 font-medium">Size</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-well/40 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F5EBE8] text-[#9A5B4D] font-mono text-[10px] font-semibold flex items-center justify-center shrink-0">
                        PDF
                      </span>
                      <div>
                        <div className="font-medium text-ink-900">{item.filename}</div>
                        <div className="text-[11px] text-ink-400 mt-0.5">
                          {item.supplier} · {item.edition}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-ink-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-ink-400" />
                      {item.dateLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-ink-600">{item.size}</td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedSourceId(selectedSourceId === item.id ? null : item.id)
                        }
                        className="px-3 py-1.5 rounded-lg border border-line bg-card hover:bg-well text-xs font-medium text-ink-900"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleArchiveSource(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sage-200 bg-sage-50 hover:bg-sage-100 text-xs font-medium text-sage-800"
                      >
                        <ArchiveRestore className="w-3.5 h-3.5" />
                        {tab === 'archived' ? 'Restore' : 'Archive'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-line bg-well/50 flex items-center gap-2 text-[11px] text-ink-600">
          <ShieldCheck className="w-3.5 h-3.5 text-ink-400" />
          Archived source records remain linked to the evidence that was created from them.
        </div>
      </Card>

      {selectedSource && (
        <Card className="p-4 mb-5 flex items-center justify-between text-xs">
          <div>
            <strong className="text-ink-900">{selectedSource.filename}</strong> — Linked to{' '}
            <span className="font-mono">{selectedSource.linkedEvidenceCount}</span> verified
            evidence citations ({selectedSource.supplier}, {selectedSource.edition}).
          </div>
          <button
            type="button"
            onClick={() => setSelectedSourceId(null)}
            className="text-ink-400 hover:text-ink-900"
          >
            Dismiss
          </button>
        </Card>
      )}

      <div className="rounded-xl border border-line bg-well px-5 py-3.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-ink-600">
          <Check className="w-4 h-4 text-sage-600" />
          <span>
            <strong className="text-ink-900">Historic evidence stays intact</strong> — Archive or
            restore files without breaking earlier product reviews.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setActiveScreen('dossier')}
          className="inline-flex items-center gap-1 font-medium text-ink-900 hover:underline"
        >
          Open evidence dossier
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};