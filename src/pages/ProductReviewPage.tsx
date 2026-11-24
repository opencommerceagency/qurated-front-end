import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Pencil,
  FileText,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, Card, StatusBadge } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const ProductReviewPage: React.FC = () => {
  const {
    products,
    activeProductIndex,
    setActiveProductIndex,
    toggleApproveField,
    updateFieldValue,
    setActiveScreen,
    preferences,
    isConnected,
  } = useWorkspace();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');

  const product = products[activeProductIndex] || products[0];
  const verifiedCount = product.fields.filter((f) => f.approved).length;
  const matchedCount = product.fields.filter((f) => f.found).length;
  const missingFields = product.fields.filter((f) => !f.found);

  const startEdit = (fieldId: string, current: string) => {
    setEditingId(fieldId);
    setDraftValue(current);
  };

  const commitEdit = (fieldId: string) => {
    updateFieldValue(product.id, fieldId, draftValue);
    setEditingId(null);
  };

  return (
    <div>
      <PageHeader
        breadcrumb={
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveScreen('queue')}
              className="inline-flex items-center gap-1.5 text-ink-600 hover:text-ink-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Catalog enrichment queue
            </button>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={activeProductIndex === 0}
                onClick={() => setActiveProductIndex(activeProductIndex - 1)}
                className="px-2 py-0.5 rounded border border-line bg-card disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={activeProductIndex >= products.length - 1}
                onClick={() => setActiveProductIndex(activeProductIndex + 1)}
                className="px-2 py-0.5 rounded border border-line bg-card disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        }
        rightMeta={`RECORD 0${activeProductIndex + 1} / 0${products.length}`}
        kicker="ENRICHMENT / EDITORIAL REVIEW"
        title="Product enrichment review"
        subtitle="Verify each extracted value against the source excerpt before it enters the catalog."
        action={
          <button
            type="button"
            onClick={() => setActiveScreen('dossier')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-line bg-card hover:bg-well text-xs font-medium text-ink-900"
          >
            <ShieldCheck className="w-4 h-4 text-ink-600" />
            Product evidence dossier
          </button>
        }
      />

      <Card className="p-6">
        <div className="flex items-center justify-between gap-4 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-well border border-line flex items-center justify-center font-mono text-[11px] text-ink-400">
              {product.sku.slice(0, 3)}
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-400">
                Template-led review · {isConnected ? 'Live extraction' : 'Sample mapping'}
              </div>
              <h2 className="font-serif text-2xl text-ink-900 mt-0.5">{product.title}</h2>
              <div className="font-mono text-[11px] text-ink-400 mt-1">
                {product.templateName} · {product.totalRequiredFields} required fields
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-serif text-2xl text-ink-900">
              {verifiedCount}{' '}
              <span className="text-base text-ink-400">/ {product.totalRequiredFields}</span>
            </div>
            <div className="text-[11px] text-ink-400">attributes verified</div>
          </div>
        </div>

        {/* Dynamic Match & Missing Attribute Warning Banner */}
        <div className="rounded-xl border border-line bg-well px-4 py-3 flex items-center justify-between gap-4 mb-5 text-xs">
          <div className="flex items-center gap-2.5 text-ink-600">
            <Sparkles className="w-4 h-4 text-ink-400 shrink-0" />
            <span>
              <strong className="font-semibold text-ink-900">
                {matchedCount} of {product.totalRequiredFields} template fields match the source.
              </strong>{' '}
              {!isConnected && 'Illustrative sample values only; no live AI extraction ran. '}
              {missingFields.length > 0 &&
                `${missingFields.length} field(s) require manual entry before publishing.`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveScreen('library')}
            className="inline-flex items-center gap-1 font-medium text-ink-900 hover:underline shrink-0"
          >
            View source files
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Attribute Grid */}
        {product.fields.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed border-line text-center text-xs text-ink-600">
            No sample fields staged for <strong>{product.title}</strong> yet. Select{' '}
            <button
              type="button"
              onClick={() => setActiveProductIndex(0)}
              className="underline font-medium text-ink-900"
            >
              Record 01 (Hexagon head screw M8 × 40)
            </button>{' '}
            to inspect full sample citations.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.fields.map((field) => {
              const isLowConf =
                preferences.flagLowConfidence && field.found && field.confidence < 0.85;

              return (
                <Card key={field.id} className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink-900">{field.label}</h3>
                        {isLowConf && (
                          <StatusBadge variant="warning">
                            <AlertTriangle className="w-3 h-3" />
                            {Math.round(field.confidence * 100)}% conf.
                          </StatusBadge>
                        )}
                      </div>
                      <StatusBadge variant={field.found ? 'success' : 'neutral'}>
                        {field.found ? 'Source found' : 'Not found'}
                      </StatusBadge>
                    </div>

                    <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-1.5">
                      Proposed value
                    </div>

                    {editingId === field.id ? (
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="text"
                          value={draftValue}
                          onChange={(e) => setDraftValue(e.target.value)}
                          className="flex-1 px-3 py-2 text-sm rounded-xl border border-sage-600 bg-card text-ink-900 focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => commitEdit(field.id)}
                          className="px-3 py-2 rounded-xl bg-sage-600 text-white text-xs font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-line bg-canvas/60 mb-3">
                        <span
                          className={`text-sm ${
                            field.found ? 'text-ink-900' : 'text-ink-600'
                          }`}
                        >
                          {field.found ? field.proposedValue : 'Not found in source'}
                        </span>
                        <button
                          type="button"
                          onClick={() => startEdit(field.id, field.proposedValue)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600 hover:text-ink-900 shrink-0"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          {field.found ? 'Change' : 'Add value'}
                        </button>
                      </div>
                    )}

                    {/* Dynamic Supplier Evidence Snippet Controlled by Settings Toggle */}
                    {preferences.showEvidenceSnippets && field.found && field.excerpt && (
                      <div className="mb-3 px-3 py-2 rounded-lg bg-well border border-line font-mono text-[11px] text-ink-600">
                        “{field.excerpt}”
                      </div>
                    )}

                    {field.found ? (
                      <button
                        type="button"
                        onClick={() => setActiveScreen('dossier')}
                        className="w-full flex items-center justify-between gap-2 text-left py-1.5 group"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-ink-400 mt-0.5 shrink-0" />
                          <div className="truncate">
                            <div className="text-xs font-medium text-ink-900 group-hover:underline">
                              View matched source page
                            </div>
                            <div className="font-mono text-[11px] text-ink-400 truncate">
                              {field.sourceFile} · {field.sourcePage}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    ) : (
                      <div className="flex items-start gap-2.5 py-1.5">
                        <FileText className="w-4 h-4 text-ink-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-ink-600">No source match</div>
                          <div className="text-[11px] text-ink-400">{field.emptyReason}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {field.found && (
                    <div className="pt-4 mt-3 border-t border-line flex items-center justify-between gap-3">
                      <span className="text-[11px] text-ink-400">
                        Compare the suggestion with the highlighted source.
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleApproveField(product.id, field.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                          field.approved
                            ? 'bg-sage-600 text-white'
                            : 'bg-amber-400 hover:bg-amber-500 text-[#1D2621]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {field.approved ? 'Approved' : 'Approve'}
                      </button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};