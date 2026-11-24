export type ScreenId =
  | 'queue'
  | 'review'
  | 'dossier'
  | 'library'
  | 'history'
  | 'templates'
  | 'settings';

export interface AttributeField {
  id: string;
  label: string;
  found: boolean;
  proposedValue: string;
  confidence: number;
  sourceFile?: string;
  sourcePage?: string;
  excerpt?: string;
  emptyReason?: string;
  approved: boolean;
}

export interface ProductRecord {
  id: string;
  sku: string;
  title: string;
  templateName: string;
  totalRequiredFields: number;
  status: 'Awaiting review' | 'In review' | 'Verified';
  fields: AttributeField[];
}

export interface SourceDocument {
  id: string;
  filename: string;
  supplier: string;
  edition: string;
  dateLabel: string;
  size: string;
  status: 'active' | 'archived';
  linkedEvidenceCount: number;
}

export interface EnrichmentRun {
  id: string;
  runCode: string;
  timeLabel: string;
  scope: string;
  sourcesCount: number;
  resultSummary: string;
  status: 'Completed' | 'Running';
}

export interface TemplateFieldSpec {
  key: string;
  label: string;
  type: 'Text' | 'Taxonomy' | 'Specification' | 'Numeric';
  required: boolean;
}

export interface UserPreferences {
  displayName: string;
  email: string;
  role: string;
  showEvidenceSnippets: boolean;
  flagLowConfidence: boolean;
  autoAdvanceApproved: boolean;
  requireDualCitation: boolean;
  readingMode: 'light' | 'dark';
}