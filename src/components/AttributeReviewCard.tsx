import React from 'react';
import { Pencil, FileText, ArrowRight, Check } from 'lucide-react';
import { Card, StatusBadge } from './ui';

export interface AttributeField {
  id: string;
  label: string;
  found: boolean;
  proposedValue: string;
  sourceFile?: string;
  sourcePage?: string;
  emptyReason?: string;
  approved?: boolean;
}

interface AttributeReviewCardProps {
  field: AttributeField;
  onEdit: (id: string) => void;
  onApprove: (id: string) => void;
  onInspectSource: (id: string) => void;
}

export const AttributeReviewCard: React.FC<AttributeReviewCardProps> = ({
  field,
  onEdit,
  onApprove,
  onInspectSource,
}) => {
  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-ink">{field.label}</h3>
          <StatusBadge variant={field.found ? 'success' : 'neutral'}>
            {field.found ? 'Source found' : 'Not found'}
          </StatusBadge>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle mb-1.5">
          Proposed value
        </div>
        <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-paper/50 mb-3">
          <span className={`text-sm ${field.found ? 'text-ink' : 'text-ink-muted'}`}>
            {field.found ? field.proposedValue : 'Not found in source'}
          </span>
          {field.found ? (
            <button
              onClick={() => onEdit(field.id)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
              Change
            </button>
          ) : (
            <span className="text-xs text-ink-subtle shrink-0">No source match</span>
          )}
        </div>

        {field.found ? (
          <button
            onClick={() => onInspectSource(field.id)}
            className="w-full flex items-center justify-between gap-2 text-left py-1.5 group"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-ink-subtle mt-0.5 shrink-0" />
              <div className="truncate">
                <div className="text-xs font-medium text-ink group-hover:underline">
                  View matched source page
                </div>
                <div className="font-mono text-[11px] text-ink-subtle truncate">
                  {field.sourceFile} · {field.sourcePage}
                </div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-ink-subtle group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        ) : (
          <div className="flex items-start gap-2.5 py-1.5">
            <FileText className="w-4 h-4 text-ink-subtle mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium text-ink-muted">No source match</div>
              <div className="text-[11px] text-ink-subtle">{field.emptyReason}</div>
            </div>
          </div>
        )}
      </div>

      {field.found && (
        <div className="pt-4 mt-3 border-t border-border/70 flex items-center justify-between gap-3">
          <span className="text-[11px] text-ink-subtle">
            Compare the sample suggestion with the highlighted source.
          </span>
          <button
            onClick={() => onApprove(field.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              field.approved
                ? 'bg-sage-600 text-white'
                : 'bg-amber-cta hover:bg-amber-ctaHover text-ink'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            {field.approved ? 'Approved' : 'Approve'}
          </button>
        </div>
      )}
    </Card>
  );
};