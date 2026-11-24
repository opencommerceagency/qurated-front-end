import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ScreenId,
  ProductRecord,
  SourceDocument,
  EnrichmentRun,
  TemplateFieldSpec,
  UserPreferences,
} from '../types/catalog';
import {
  DUMMY_SNAPSHOT,
  fetchWorkspaceSnapshot,
  syncBackendAction,
} from '../services/api';

interface WorkspaceContextValue {
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  isConnected: boolean;
  products: ProductRecord[];
  activeProductIndex: number;
  setActiveProductIndex: (idx: number) => void;
  toggleApproveField: (productId: string, fieldId: string) => void;
  updateFieldValue: (productId: string, fieldId: string, newValue: string) => void;
  sources: SourceDocument[];
  toggleArchiveSource: (sourceId: string) => void;
  runs: EnrichmentRun[];
  triggerSampleRun: () => void;
  templateFields: TemplateFieldSpec[];
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;
  preferences: UserPreferences;
  updatePreferences: (patch: Partial<UserPreferences>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('review');
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState<ProductRecord[]>(DUMMY_SNAPSHOT.products);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [sources, setSources] = useState<SourceDocument[]>(DUMMY_SNAPSHOT.sources);
  const [runs, setRuns] = useState<EnrichmentRun[]>(DUMMY_SNAPSHOT.runs);
  const [templateFields, setTemplateFields] = useState<TemplateFieldSpec[]>(
    DUMMY_SNAPSHOT.templateFields
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(DUMMY_SNAPSHOT.preferences);

  useEffect(() => {
    fetchWorkspaceSnapshot().then((snapshot) => {
      setIsConnected(snapshot.isConnected);
      setProducts(snapshot.products);
      setSources(snapshot.sources);
      setRuns(snapshot.runs);
      setTemplateFields(snapshot.templateFields);
      setPreferences(snapshot.preferences);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (preferences.readingMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [preferences.readingMode]);

  const toggleApproveField = (productId: string, fieldId: string) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        const updatedFields = prod.fields.map((f) =>
          f.id === fieldId ? { ...f, approved: !f.approved } : f
        );
        const foundCount = updatedFields.filter((f) => f.found).length;
        const approvedCount = updatedFields.filter((f) => f.approved).length;
        return {
          ...prod,
          fields: updatedFields,
          status:
            foundCount > 0 && approvedCount === foundCount ? 'Verified' : 'In review',
        };
      })
    );
    syncBackendAction(`/products/${productId}/fields/${fieldId}/approve`, {});
  };

  const updateFieldValue = (productId: string, fieldId: string, newValue: string) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        return {
          ...prod,
          fields: prod.fields.map((f) =>
            f.id === fieldId
              ? { ...f, proposedValue: newValue, found: Boolean(newValue.trim()) }
              : f
          ),
        };
      })
    );
    syncBackendAction(`/products/${productId}/fields/${fieldId}`, { value: newValue });
  };

  const toggleArchiveSource = (sourceId: string) => {
    setSources((prev) =>
      prev.map((src) =>
        src.id === sourceId
          ? { ...src, status: src.status === 'active' ? 'archived' : 'active' }
          : src
      )
    );
    syncBackendAction(`/sources/${sourceId}/toggle-archive`, {});
  };

  const triggerSampleRun = () => {
    const nextNum = String(runs.length + 5).padStart(3, '0');
    const activeCount = sources.filter((s) => s.status === 'active').length;
    const newRun: EnrichmentRun = {
      id: `run-${nextNum}`,
      runCode: `CATALOG-${nextNum}`,
      timeLabel: isConnected ? 'Just now · Live sync' : 'Just now · Local preview',
      scope: `${activeCount} attached supplier catalogs`,
      sourcesCount: activeCount,
      resultSummary: `${activeCount} PDFs staged · ${products.length} catalog records ready`,
      status: 'Completed',
    };
    setRuns((prev) => [newRun, ...prev]);
    syncBackendAction('/runs', newRun);
  };

  const updatePreferences = (patch: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...patch }));
    syncBackendAction('/preferences', patch);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        isConnected,
        products,
        activeProductIndex,
        setActiveProductIndex,
        toggleApproveField,
        updateFieldValue,
        sources,
        toggleArchiveSource,
        runs,
        triggerSampleRun,
        templateFields,
        selectedTemplateId,
        setSelectedTemplateId,
        preferences,
        updatePreferences,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return ctx;
};