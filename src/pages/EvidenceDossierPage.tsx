import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageHeader, Card, StatusBadge, InfoBanner } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const EvidenceDossierPage: React.FC = () => {
  const { products, activeProductIndex, setActiveScreen, isConnected } = useWorkspace();
  const product = products[activeProductIndex] || products[0];

  return (
    <div>
      <PageHeader
        kicker="AUDIT / PROVENANCE LEDGER"
        title="Product evidence dossier"
        subtitle="Complete line-by-line citation trail linking approved catalog values to supplier PDF pages."
        rightMeta={product.sku}
        action={
          <button
            type="button"
            onClick={() => setActiveScreen('review')}
            className="px-3.5 py-2 rounded-xl border border-line bg-card hover:bg-well text-xs font-medium text-ink-900"
          >
            Back to review
          </button>
        }
      />

      <InfoBanner
        icon={<ShieldCheck className="w-4 h-4 text-sage-700" />}
        title={isConnected ? 'Cryptographic provenance synced' : 'Browser preview provenance'}
        description="Every approved value retains its source PDF edition and page citation even if the PDF is later archived."
        rightMeta={`${product.fields.filter((f) => f.approved).length} approved citations`}
        accentBorder
      />

      <Card className="p-6">
        <div className="mb-5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
            SUBJECT RECORD
          </div>
          <h2 className="font-serif text-2xl text-ink-900 mt-0.5">{product.title}</h2>
        </div>

        <div className="divide-y divide-line">
          {product.fields.map((field) => (
            <div
              key={field.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink-900">{field.label}</span>
                  <StatusBadge variant={field.approved ? 'success' : 'neutral'}>
                    {field.approved ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" /> Pending sign-off
                      </>
                    )}
                  </StatusBadge>
                </div>
                <div className="text-xs text-ink-600">
                  Value:{' '}
                  <strong className="text-ink-900">
                    {field.proposedValue || 'Unassigned'}
                  </strong>
                </div>
                {field.excerpt && (
                  <div className="font-mono text-[11px] text-ink-400">
                    Excerpt: “{field.excerpt}”
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-ink-600 font-mono shrink-0">
                <FileText className="w-4 h-4 text-ink-400" />
                {field.sourceFile ? `${field.sourceFile} (${field.sourcePage})` : 'No source file'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};