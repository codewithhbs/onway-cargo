import ServiceDetail from '@/components/ServiceDetail';
import { SERVICES } from '@/lib/content';

const data = SERVICES['warehousing'];

export const metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: { canonical: '/warehousing' },
  openGraph: { title: data.metaTitle, description: data.metaDescription, images: [data.image] },
};

export default function Page() {
  return <ServiceDetail data={data} />;
}
