import React from 'react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  subtitle: string;
  breadcrumb?: React.ReactNode;
  rightSlot?: React.ReactNode;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  subtitle,
  breadcrumb,
  rightSlot,
  action,
}) => (
  <div className="mb-6">
    {(breadcrumb || rightSlot) && (
      <div className="flex items-center justify-between text-xs text-ink-600 mb-4">
        <div>{breadcrumb}</div>
        <div className="font-mono text-[11px] tracking-wider uppercase text-ink-400">
          {rightSlot}
        </div>
      </div>
    )}
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-400 mb-1.5">
          {kicker}
        </div>
        <h1 className="font-serif text-[32px] leading-tight font-normal text-ink-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-ink-600 mt-1.5 max-w-2xl">{subtitle}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  </div>
);

interface InfoBannerProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  rightMeta?: React.ReactNode;
  accentBorder?: boolean;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({
  icon,
  title,
  description,
  rightMeta,
  accentBorder = false,
}) => (
  <div
    className={`rounded-xl border border-line bg-well px-4 py-3.5 flex items-center justify-between gap-4 mb-6 ${
      accentBorder ? 'border-l-[3px] border-l-sage-700' : ''
    }`}
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-ink-600 shrink-0">{icon}</div>
      <div>
        <div className="text-xs font-semibold text-ink-900">{title}</div>
        {description && <div className="text-xs text-ink-600 mt-0.5">{description}</div>}
      </div>
    </div>
    {rightMeta && <div className="text-xs text-ink-600 shrink-0">{rightMeta}</div>}
  </div>
);

type BadgeVariant = 'success' | 'neutral' | 'warning';

export const StatusBadge: React.FC<{ variant?: BadgeVariant; children: React.ReactNode }> = ({
  variant = 'success',
  children,
}) => {
  const styles: Record<BadgeVariant, string> = {
    success: 'bg-sage-100 text-sage-700 border-sage-200',
    neutral: 'bg-well text-ink-600 border-line',
    warning: 'bg-amber-100 text-amber-800 border-amber-400/40',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`bg-card border border-line rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${className}`}>
    {children}
  </div>
);