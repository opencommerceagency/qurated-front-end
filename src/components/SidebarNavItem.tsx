import React from 'react';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  active,
  badge,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start justify-between gap-2 px-3 py-2.5 rounded-lg text-left text-[13px] transition-colors ${
        active
          ? 'bg-sage-100 text-sage-800 font-medium'
          : 'text-ink-600 hover:bg-black/[0.03] hover:text-ink-900'
      }`}
    >
      <span className="flex items-start gap-2.5">
        <span className={`mt-0.5 ${active ? 'text-sage-700' : 'text-ink-400'}`}>
          {icon}
        </span>
        <span className="leading-snug">{label}</span>
      </span>
      {badge !== undefined && (
        <span className="px-1.5 py-0.5 text-[11px] font-medium rounded-full bg-amber-100 text-amber-800">
          {badge}
        </span>
      )}
    </button>
  );
};