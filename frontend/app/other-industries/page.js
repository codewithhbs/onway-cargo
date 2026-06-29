import ServiceDetail from '@/components/ServiceDetail';
import { INDUSTRIES } from '@/lib/content';

const data = INDUSTRIES['other-industries'];

export const metadata = {
  title: data.title,
  description: data.metaDescription,
  alternates: { canonical: '/other-industries' },
  openGraph: { title: data.metaTitle, description: data.metaDescription, images: [data.image] },
};

export default function Page() {
  return <ServiceDetail data={data} />;
}
