interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: String;
            name: string;
        },
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'viniciusmr1499@gmail.com',
            name: 'Marcos Vinicius'
        }
    }
} as IMailConfig;
