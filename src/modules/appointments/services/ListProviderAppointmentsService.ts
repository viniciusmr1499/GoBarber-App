import { injectable, inject } from 'tsyringe';

import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

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
    ) {}

    public async execute({
        day,
        provider_id,
        month,
        year
    }: IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day,
        });

        return appointments;
    }
}
