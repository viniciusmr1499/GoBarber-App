import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IApointmentsRepository from '../repositories/IApointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IApointmentsRepository,
    ) {}

    public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            month,
            provider_id,
            year,
        })

        return [{ day: 1, available: false }];
    }
}

export default ListProviderMonthAvailabilityService;
