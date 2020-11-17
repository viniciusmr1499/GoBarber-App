import { container } from 'tsyringe';

import IStoragelProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
   disk: DiskStorageProvider,
};

container.registerSingleton<IStoragelProvider>(
    'StorageProvider',
    providers.disk,
);
