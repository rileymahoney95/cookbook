import { pgDatasource } from '../data-source';
import { seed } from './seed';

const runSeed = async () => {
  try {
    await pgDatasource.initialize();
    await seed(pgDatasource);
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

runSeed(); 