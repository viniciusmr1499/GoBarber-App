import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IApointmentsRepository,
    ) {}

    public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            day,
            provider_id,
            month,
            year
        });

        const hourStart = 8;

        const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart );

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(appointment =>
                getHours(appointment.date) === hour,
            );

            return {
                hour,
                available: !hasAppointmentInHour
            }
        })

        return availability;
    }
}
