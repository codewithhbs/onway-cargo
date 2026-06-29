import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/content';

const data = SERVICES['custom-clearance'];

export const metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: { canonical: '/custom-clearance' },
  openGraph: { title: data.metaTitle, description: data.metaDescription, images: [data.image] },
};

export default function Page() {
  return <ServiceDetail data={data} />;
}
