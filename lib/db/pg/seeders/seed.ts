import 'reflect-metadata';
import { runSeeders } from 'typeorm-extension';
import { pgDatasource } from '../data-source';

(async () => {
  try {
    console.log('Setting up datasource...');
    await pgDatasource.initialize();
    console.log('Seeding...');
    await runSeeders(pgDatasource);
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    console.log('Cleaning up datasource...');
    await pgDatasource.destroy();
  }
})();
