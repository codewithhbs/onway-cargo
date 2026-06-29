import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/content';

const data = SERVICES['transportation'];

export const metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: { canonical: '/transportation' },
  openGraph: { title: data.metaTitle, description: data.metaDescription, images: [data.image] },
};

export default function Page() {
  return <ServiceDetail data={data} />;
}
