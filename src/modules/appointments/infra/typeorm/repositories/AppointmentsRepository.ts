import { getRepository, Repository, Raw } from 'typeorm';

import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IApointmentsRepository{
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: {
                date
            }
        });

        return findAppointment || undefined;
    }

    public async findAllInMonthFromProvider({ month, year, provider_id }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            },
        });

        return appointments;
    }

    public async findAllInDayFromProvider({ month, year, provider_id, day }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                ),
            },
        });

        return appointments;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
