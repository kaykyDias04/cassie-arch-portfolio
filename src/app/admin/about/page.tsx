import { getAboutData } from '@/lib/data';
import EditAboutClient from './EditAboutClient';

export const dynamic = 'force-dynamic';

export default async function EditAboutPage() {
  const aboutData = await getAboutData();
  
  return <EditAboutClient initialData={aboutData} />;
}
