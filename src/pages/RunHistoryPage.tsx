import React from 'react';
import {
  Play,
  GitFork,
  FileText,
  Clock,
  ArrowRight,
  Check,
  HelpCircle,
} from 'lucide-react';
import { PageHeader, Card, StatusBadge } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const RunHistoryPage: React.FC = () => {
  const {
    runs,
    sources,
    products,
    triggerSampleRun,
    setActiveScreen,
    isConnected,
  } = useWorkspace();

  const activeSourcesCount = sources.filter((s) => s.status === 'active').length;
  const awaitingReviewCount = products.filter((p) => p.status !== 'Verified').length;

  return (
    <div>
      <PageHeader
        kicker="ENRICHMENT / OPERATIONS"
        title="Enrichment run history"
        subtitle={
          isConnected
            ? 'Live extraction runs synced with your workspace queue and evidence ledger.'
            : 'A local preview ledger only—no automated enrichment run or backend import was performed.'
        }
        action={
          <button
            type="button"
            onClick={triggerSampleRun}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#1D2621] text-xs font-semibold transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isConnected ? 'Start enrichment run' : 'View local preview'}
          </button>
        }
      />

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400 mb-2">
            Runs in history
          </div>
          <div className="font-serif text-3xl text-ink-900 mb-3">
            {String(runs.length).padStart(2, '0')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-600">
            <GitFork className="w-3.5 h-3.5 text-ink-400" />
            <span>Shared with all five views</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400 mb-2">
            Source references
          </div>
          <div className="font-serif text-3xl text-ink-900 mb-3">
            {String(activeSourcesCount).padStart(2, '0')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-600">
            <FileText className="w-3.5 h-3.5 text-ink-400" />
            <span>From the source library</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400 mb-2">
            Awaiting review
          </div>
          <div className="font-serif text-3xl text-ink-900 mb-3">
            {String(awaitingReviewCount).padStart(2, '0')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-600">
            <Clock className="w-3.5 h-3.5 text-ink-400" />
            <span>Decisions sync to queue</span>
          </div>
        </Card>
      </div>

      {/* Recent Activity Ledger */}
      <Card className="overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400">
              Recent activity
            </div>
            <h2 className="font-serif text-xl text-ink-900 mt-0.5">Run history</h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveScreen('queue')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600 hover:text-ink-900"
          >
            Open catalog queue
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">
                <th className="py-3 px-6 font-medium">Run</th>
                <th className="py-3 px-4 font-medium">Time</th>
                <th className="py-3 px-4 font-medium">Scope</th>
                <th className="py-3 px-4 font-medium">Sources</th>
                <th className="py-3 px-4 font-medium">Result</th>
                <th className="py-3 px-6 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-xs">
              {runs.map((run) => (
                <tr key={run.id} className="hover:bg-well/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center">
                        <GitFork className="w-4 h-4" />
                      </span>
                      <span className="font-mono font-medium text-ink-900">{run.runCode}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-ink-600">{run.timeLabel}</td>
                  <td className="py-4 px-4 text-ink-900">{run.scope}</td>
                  <td className="py-4 px-4 text-ink-600">{run.sourcesCount} files</td>
                  <td className="py-4 px-4 text-ink-900">{run.resultSummary}</td>
                  <td className="py-4 px-6 text-right">
                    <StatusBadge variant="success">
                      <Check className="w-3 h-3" />
                      {run.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-line bg-well/50 flex items-center gap-2 text-[11px] text-ink-600">
          <HelpCircle className="w-3.5 h-3.5 text-ink-400" />
          {isConnected
            ? 'New runs sync automatically across the queue and evidence dossier.'
            : 'Run actions use local sample data only. New runs appear here and sync to the other workspace views.'}
        </div>
      </Card>

      <div className="rounded-xl border border-line bg-well px-5 py-3.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-ink-600">
          <Check className="w-4 h-4 text-sage-600" />
          <span>Review status, evidence and source files are connected to this run history.</span>
        </div>
        <button
          type="button"
          onClick={() => setActiveScreen('dossier')}
          className="inline-flex items-center gap-1 font-medium text-ink-900 hover:underline"
        >
          View product evidence
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};