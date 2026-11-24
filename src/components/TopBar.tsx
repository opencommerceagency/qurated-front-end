import React from 'react';
import { Layers, Sparkles, Server } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export const TopBar: React.FC = () => {
  const { isConnected } = useWorkspace();

  return (
    <header className="h-14 border-b border-line bg-canvas flex items-center justify-between px-5 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-700">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-none tracking-tight text-ink-900">
            qurated
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] text-ink-400 uppercase mt-1">
            Catalog Operations
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-ink-600">
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-sage-600' : 'bg-amber-400'
            }`}
          />
          {isConnected ? 'Live backend connected' : 'Shared preview data'}
        </span>
        <span className="h-4 w-px bg-line" />
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-600">
          {isConnected ? (
            <>
              <Server className="w-3.5 h-3.5 text-sage-600" />
              API Synced
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-ink-400" />
              Prototype
            </>
          )}
        </span>
      </div>
    </header>
  );
};