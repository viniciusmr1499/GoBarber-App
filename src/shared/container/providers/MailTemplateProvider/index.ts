import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarsMailTemplateProvideremplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
    handlebars: HandlebarsMailTemplateProvideremplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebars
);
