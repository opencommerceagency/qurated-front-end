import React from 'react';
import { TopBar } from './Topbar';
import { Sidebar } from './Sidebar';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-canvas text-ink-900 flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-8 py-7 max-w-6xl">{children}</main>
      </div>
    </div>
  );
};