import { PolicyDetail } from '@/components/dashboard/policy-detail';

interface PolicyPageProps {
  params: {
    id: string;
  };
}

export default function PolicyPage({ params }: PolicyPageProps) {
  return <PolicyDetail policyId={params.id} />;
}
