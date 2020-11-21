import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    provider_id: string;
    month: number;
    day: number;
    year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IApointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        day,
        provider_id,
        month,
        year
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}:${day}`;

        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );

        if(!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider({
                provider_id,
                year,
                month,
                day,
            });

            await this.cacheProvider.save(
                cacheKey,
                appointments
            );
        }

        return appointments;
    }
}
