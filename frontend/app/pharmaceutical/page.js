import ServiceDetail from '@/components/ServiceDetail';
import { INDUSTRIES } from '@/lib/content';

const data = INDUSTRIES['pharmaceutical'];

export const metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: { canonical: '/pharmaceutical' },
  openGraph: { title: data.metaTitle, description: data.metaDescription, images: [data.image] },
};

export default function Page() {
  return <ServiceDetail data={data} />;
}
