import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { AppShell } from './components/AppShell';
import { QueuePage } from './pages/QueuePage';
import { ProductReviewPage } from './pages/ProductReviewPage';
import { EvidenceDossierPage } from './pages/EvidenceDossierPage';
import { SourceLibraryPage } from './pages/SourceLibraryPage';
import { RunHistoryPage } from './pages/RunHistoryPage';
import { TemplateSetupPage } from './pages/TemplateSetupPage';
import { UserSettingsPage } from './pages/UserSettingsPage';

function WorkspaceRouter() {
  const { activeScreen } = useWorkspace();

  return (
    <AppShell>
      {activeScreen === 'queue' && <QueuePage />}
      {activeScreen === 'review' && <ProductReviewPage />}
      {activeScreen === 'dossier' && <EvidenceDossierPage />}
      {activeScreen === 'library' && <SourceLibraryPage />}
      {activeScreen === 'history' && <RunHistoryPage />}
      {activeScreen === 'templates' && <TemplateSetupPage />}
      {activeScreen === 'settings' && <UserSettingsPage />}
    </AppShell>
  );
}

export default function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceRouter />
    </WorkspaceProvider>
  );
}