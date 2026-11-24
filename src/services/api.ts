import {
  ProductRecord,
  SourceDocument,
  EnrichmentRun,
  TemplateFieldSpec,
  UserPreferences,
} from '../types/catalog';

const API_BASE_URL = (import.meta as ImportMeta & { env: { VITE_API_URL?: string } }).env.VITE_API_URL || '';

export interface WorkspaceSnapshot {
  isConnected: boolean;
  products: ProductRecord[];
  sources: SourceDocument[];
  runs: EnrichmentRun[];
  templateFields: TemplateFieldSpec[];
  preferences: UserPreferences;
}

export const DUMMY_SNAPSHOT: WorkspaceSnapshot = {
  isConnected: false,
  products: [
    {
      id: 'prod-01',
      sku: 'REY-933-M8X40',
      title: 'Hexagon head screw M8 × 40',
      templateName: 'REYHER · webshop product template',
      totalRequiredFields: 9,
      status: 'In review',
      fields: [
        {
          id: 'title',
          label: 'Product title',
          found: true,
          proposedValue: 'Hexagon head screw M8 × 40',
          confidence: 0.98,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 160 · printed p. 158',
          excerpt: 'ISO 4017 (DIN 933) Hexagon head screws with thread up to head — M8 × 40',
          approved: false,
        },
        {
          id: 'category',
          label: 'Category',
          found: true,
          proposedValue: 'Fasteners / Hexagon screws',
          confidence: 0.94,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 160 · printed p. 158',
          excerpt: 'Section 01 · Hexagon head screws and bolts',
          approved: false,
        },
        {
          id: 'material',
          label: 'Material / grade',
          found: false,
          proposedValue: '',
          confidence: 0.12,
          emptyReason: 'No material grade is stated in the cited REYHER pages.',
          approved: false,
        },
        {
          id: 'standard',
          label: 'Standard',
          found: true,
          proposedValue: 'ISO 4017 (DIN 933)',
          confidence: 0.99,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 160 · printed p. 158',
          excerpt: 'Standard specification: ISO 4017 / DIN 933 full thread',
          approved: false,
        },
        {
          id: 'thread-pitch',
          label: 'Thread pitch',
          found: true,
          proposedValue: '1.25 mm (Metric coarse)',
          confidence: 0.84,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 160 · printed p. 158',
          excerpt: 'Nominal diameter d = M8, pitch P = 1.25 mm',
          approved: false,
        },
        {
          id: 'head-height',
          label: 'Head height (k)',
          found: true,
          proposedValue: '5.3 mm',
          confidence: 0.78,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 160 · printed p. 158',
          excerpt: 'Dimension table: k max = 5.45 mm, k nom = 5.3 mm',
          approved: false,
        },
      ],
    },
    {
      id: 'prod-02',
      sku: 'REY-912-M6X25',
      title: 'Socket head cap screw M6 × 25',
      templateName: 'REYHER · webshop product template',
      totalRequiredFields: 9,
      status: 'Awaiting review',
      fields: [
        {
          id: 'title',
          label: 'Product title',
          found: true,
          proposedValue: 'Socket head cap screw M6 × 25',
          confidence: 0.96,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 214 · printed p. 212',
          excerpt: 'ISO 4762 (DIN 912) Hexagon socket head cap screws M6 × 25',
          approved: false,
        },
        {
          id: 'standard',
          label: 'Standard',
          found: true,
          proposedValue: 'ISO 4762 (DIN 912)',
          confidence: 0.99,
          sourceFile: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
          sourcePage: 'PDF p. 214 · printed p. 212',
          excerpt: 'ISO 4762 / DIN 912 cylindrical head',
          approved: false,
        },
      ],
    },
    {
      id: 'prod-03',
      sku: 'MAR-125-M10',
      title: 'Plain washer Form A M10',
      templateName: 'REYHER · webshop product template',
      totalRequiredFields: 9,
      status: 'Awaiting review',
      fields: [],
    },
    {
      id: 'prod-04',
      sku: 'SP-985-M8',
      title: 'Prevailing torque hexagon nut M8',
      templateName: 'REYHER · webshop product template',
      totalRequiredFields: 9,
      status: 'Awaiting review',
      fields: [],
    },
    {
      id: 'prod-05',
      sku: 'REY-7991-M10X30',
      title: 'Countersunk head screw M10 × 30',
      templateName: 'REYHER · webshop product template',
      totalRequiredFields: 9,
      status: 'Awaiting review',
      fields: [],
    },
  ],
  sources: [
    {
      id: 'src-1',
      filename: 'REYHER_Catalogue_2020_04_EN_Web_ks.pdf',
      supplier: 'REYHER',
      edition: '2020 / 04 EN edition',
      dateLabel: '12 Nov 2026',
      size: '48.2 MB',
      status: 'active',
      linkedEvidenceCount: 18,
    },
    {
      id: 'src-2',
      filename: 'Marintech_Fasteners_2026_EN.pdf',
      supplier: 'Marintech',
      edition: '2026 edition',
      dateLabel: '08 Nov 2026',
      size: '31.5 MB',
      status: 'active',
      linkedEvidenceCount: 7,
    },
    {
      id: 'src-3',
      filename: 'SP_Industrial_Bolts_2025.pdf',
      supplier: 'S+P',
      edition: '2025 edition',
      dateLabel: '03 Nov 2026',
      size: '19.4 MB',
      status: 'active',
      linkedEvidenceCount: 5,
    },
    {
      id: 'src-4',
      filename: 'DIN_ISO_Technical_Reference_2024.pdf',
      supplier: 'Standards Ledger',
      edition: '2024 edition',
      dateLabel: '28 Oct 2026',
      size: '14.1 MB',
      status: 'active',
      linkedEvidenceCount: 9,
    },
    {
      id: 'src-5',
      filename: 'REYHER_Stainless_Supplement_2023.pdf',
      supplier: 'REYHER',
      edition: '2023 supplement',
      dateLabel: '21 Oct 2026',
      size: '12.0 MB',
      status: 'active',
      linkedEvidenceCount: 4,
    },
    {
      id: 'src-arch-1',
      filename: 'Indexverzeichnis_MT_2024_25_WEB.pdf',
      supplier: 'Marintech',
      edition: '2024 / 25 edition',
      dateLabel: '14 Oct 2026',
      size: '22.4 MB',
      status: 'archived',
      linkedEvidenceCount: 6,
    },
    {
      id: 'src-arch-2',
      filename: 'REYHER_Catalogue_2018_10_EN.pdf',
      supplier: 'REYHER',
      edition: 'October 2018 edition',
      dateLabel: '29 Sep 2026',
      size: '18.6 MB',
      status: 'archived',
      linkedEvidenceCount: 11,
    },
    {
      id: 'src-arch-3',
      filename: 'S+P_Fasteners_2021.pdf',
      supplier: 'S+P',
      edition: '2021 edition',
      dateLabel: '02 Sep 2026',
      size: '10.8 MB',
      status: 'archived',
      linkedEvidenceCount: 3,
    },
  ],
  runs: [
    {
      id: 'run-005',
      runCode: 'CATALOG-005',
      timeLabel: 'Current preview',
      scope: '5 attached supplier catalogs',
      sourcesCount: 5,
      resultSummary: '5 PDFs staged · 5 catalog records ready',
      status: 'Completed',
    },
  ],
  templateFields: [
    { key: 'product_title', label: 'Product title', type: 'Text', required: true },
    { key: 'category_path', label: 'Category', type: 'Taxonomy', required: true },
    { key: 'material_grade', label: 'Material / grade', type: 'Specification', required: true },
    { key: 'norm_standard', label: 'Standard', type: 'Specification', required: true },
    { key: 'thread_diameter', label: 'Nominal diameter', type: 'Numeric', required: true },
    { key: 'nominal_length', label: 'Nominal length', type: 'Numeric', required: true },
    { key: 'thread_pitch', label: 'Thread pitch', type: 'Numeric', required: true },
    { key: 'head_height', label: 'Head height (k)', type: 'Numeric', required: true },
    { key: 'drive_type', label: 'Drive / wrench size', type: 'Specification', required: true },
  ],
  preferences: {
    displayName: 'Mila van Dijk',
    email: 'mila.vandijk@qurated.example',
    role: 'Catalog editor',
    showEvidenceSnippets: true,
    flagLowConfidence: true,
    autoAdvanceApproved: false,
    requireDualCitation: false,
    readingMode: 'light',
  },
};

export async function fetchWorkspaceSnapshot(): Promise<WorkspaceSnapshot> {
  if (!API_BASE_URL) {
    return DUMMY_SNAPSHOT;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE_URL}/workspace/snapshot`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { ...DUMMY_SNAPSHOT, ...data, isConnected: true };
  } catch {
    return DUMMY_SNAPSHOT;
  }
}

export async function syncBackendAction(endpoint: string, payload: unknown): Promise<boolean> {
  if (!API_BASE_URL) return false;
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}