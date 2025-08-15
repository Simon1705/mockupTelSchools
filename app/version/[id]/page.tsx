import { VersionComparison } from '@/components/dashboard/version-comparison';

interface VersionPageProps {
  params: {
    id: string;
  };
}

export default function VersionPage({ params }: VersionPageProps) {
  return <VersionComparison versionId={params.id} />;
}
