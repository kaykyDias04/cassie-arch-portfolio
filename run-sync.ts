import "dotenv/config";
import { syncProjectSlugs } from './src/lib/data';

async function main() {
  console.log('Sincronizando slugs...');
  await syncProjectSlugs();
  console.log('Slugs sincronizados!');
}

main().catch(console.error).finally(() => process.exit(0));
