import React from 'react';
import {
  Info,
  Lock,
  FileSpreadsheet,
  Upload,
  Tag,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader, Card, InfoBanner, StatusBadge } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const TemplateSetupPage: React.FC = () => {
  const {
    templateFields,
    selectedTemplateId,
    setSelectedTemplateId,
    isConnected,
  } = useWorkspace();

  const isSampleSelected = selectedTemplateId === 'reyher-sample';

  return (
    <div>
      <PageHeader
        breadcrumb={
          <span>
            Catalog workflow <span className="mx-1.5">&gt;</span>{' '}
            <strong className="text-ink-900">Template setup</strong>
          </span>
        }
        rightMeta="STEP 06 —— REVIEW HANDOFF"
        kicker="CATALOG CONFIGURATION / MERCHANT HANDOFF"
        title="Set the shape of the review."
        subtitle="Choose a webshop product template. Qurated will use its required fields to organize a human evidence review."
      />

      <InfoBanner
        icon={<Info className="w-4 h-4 text-sage-700" />}
        title={isConnected ? 'Live schema active' : 'Demonstration only'}
        description={
          isConnected
            ? 'Selected template schemas map directly to your product review attributes.'
            : 'No AI extraction or backend upload occurs here. The sample carries only its field list between these screens.'
        }
        rightMeta={
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
            <Lock className="w-3.5 h-3.5" />
            {isConnected ? 'API synced' : 'Browser-local'}
          </span>
        }
        accentBorder
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full border border-line bg-card font-mono text-xs flex items-center justify-center text-ink-600 shrink-0 mt-0.5">
              01
            </span>
            <div>
              <h2 className="font-serif text-xl text-ink-900">Select a template</h2>
              <p className="text-xs text-ink-600 mt-0.5">
                Start with the included supplier-to-webshop example.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedTemplateId(isSampleSelected ? null : 'reyher-sample')
            }
            className={`w-full text-left p-4 rounded-2xl border transition-all ${
              isSampleSelected
                ? 'border-sage-700 bg-sage-50/60 ring-1 ring-sage-700/20'
                : 'border-line bg-card hover:border-line-strong'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-well border border-line flex items-center justify-center text-sage-700 shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] tracking-wider uppercase text-ink-400">
                  Included sample · XLSX preview
                </div>
                <div className="text-sm font-semibold text-ink-900 mt-0.5">
                  REYHER · webshop product template
                </div>
                <div className="font-mono text-[11px] text-ink-400 mt-1">
                  reyher_webshop_product_template.xlsx · {templateFields.length} required fields
                </div>
              </div>
            </div>
          </button>

          <div className="p-6 rounded-2xl border border-dashed border-line-strong bg-card/60 text-center">
            <Upload className="w-5 h-5 text-amber-800 mx-auto mb-2" />
            <div className="text-xs font-semibold text-ink-900">
              Or choose a local template to preview
            </div>
            <div className="text-[11px] text-ink-400 mt-1 mb-3">
              XLSX, CSV, JSON or PDF · preview only
            </div>
            <button
              type="button"
              onClick={() => setSelectedTemplateId('reyher-sample')}
              className="px-4 py-1.5 rounded-lg border border-line bg-card hover:bg-well text-xs font-medium text-ink-900"
            >
              Browse files
            </button>
          </div>
        </div>

        {/* Right Column: Field Set Preview */}
        <Card className="lg:col-span-7 p-6 flex flex-col justify-between min-h-[380px]">
          <div className="flex items-start justify-between border-b border-line pb-4">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-ink-400">
                <Layers className="w-3.5 h-3.5" />
                Merchant field set
              </div>
              <h2 className="font-serif text-2xl text-ink-900 mt-1">
                Your review, pre-shaped
              </h2>
              <p className="text-xs text-ink-600 mt-0.5">
                {isSampleSelected
                  ? 'Showing the 9 required attributes that structure the editorial review.'
                  : 'Select the sample template to reveal its required field set.'}
              </p>
            </div>
            <div className="text-right font-mono text-xs text-ink-400">
              <div className="text-sm font-semibold text-ink-900">
                {isSampleSelected ? `0${templateFields.length}` : '—'}
              </div>
              <div className="text-[10px]">FIELDS</div>
            </div>
          </div>

          {!isSampleSelected ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-full bg-well border border-line flex items-center justify-center text-ink-400 mb-3">
                <Tag className="w-5 h-5" />
              </div>
              <div className="font-serif text-lg text-ink-900">Fields will appear here</div>
              <p className="text-xs text-ink-600 max-w-xs mt-1">
                Start with the sample to see how a merchant’s template shapes evidence review.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-line mt-2">
              {templateFields.map((tf, index) => (
                <div
                  key={tf.key}
                  className="py-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-ink-400">
                      0{index + 1}
                    </span>
                    <span className="font-medium text-ink-900">{tf.label}</span>
                    <span className="font-mono text-[11px] text-ink-400">{tf.key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge variant="neutral">{tf.type}</StatusBadge>
                    <StatusBadge variant="success">
                      <CheckCircle2 className="w-3 h-3" /> Required
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};