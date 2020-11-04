import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import IApointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';

class FakeAppointmentsRepository implements IApointmentsRepository{
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async findAllInMonthFromProvider({ month, year, provider_id }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment => appointment.provider_id === provider_id &&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year,
        );

        return appointments;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRepository;
