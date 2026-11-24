import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PageHeader, Card, StatusBadge, InfoBanner } from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';

export const QueuePage: React.FC = () => {
  const { products, setActiveProductIndex, setActiveScreen, isConnected, preferences } =
    useWorkspace();

  const openRecord = (index: number) => {
    setActiveProductIndex(index);
    setActiveScreen('review');
  };

  return (
    <div>
      <PageHeader
        kicker="ENRICHMENT / WORK QUEUE"
        title="Catalog enrichment queue"
        subtitle="Select a staged product record to verify extracted attributes against supplier PDFs."
        rightMeta={`${products.length} STAGED RECORDS`}
      />

      {!isConnected && (
        <InfoBanner
          icon={<AlertTriangle className="w-4 h-4 text-amber-800" />}
          title="Local preview queue active"
          description="No backend API is connected (VITE_API_URL not set). Showing 5 sample supplier records."
          rightMeta="Fallback mode"
          accentBorder
        />
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">
                <th className="py-3.5 px-5 font-medium">Product / SKU</th>
                <th className="py-3.5 px-4 font-medium">Template</th>
                <th className="py-3.5 px-4 font-medium">Verification</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-xs">
              {products.map((product, idx) => {
                const approvedCount = product.fields.filter((f) => f.approved).length;
                const hasLowConfidence =
                  preferences.flagLowConfidence &&
                  product.fields.some((f) => f.confidence < 0.85);

                return (
                  <tr key={product.id} className="hover:bg-well/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-medium text-ink-900">{product.title}</div>
                      <div className="font-mono text-[11px] text-ink-400 mt-0.5">
                        {product.sku}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-ink-600">{product.templateName}</td>
                    <td className="py-4 px-4 font-mono text-[11px] text-ink-600">
                      {approvedCount} / {product.totalRequiredFields} verified
                      {hasLowConfidence && (
                        <span className="ml-2 text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                          Low confidence
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge
                        variant={
                          product.status === 'Verified'
                            ? 'success'
                            : product.status === 'In review'
                            ? 'warning'
                            : 'neutral'
                        }
                      >
                        {product.status === 'Verified' && (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        {product.status}
                      </StatusBadge>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => openRecord(idx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-[#1D2621] font-medium transition-colors"
                      >
                        Review
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};