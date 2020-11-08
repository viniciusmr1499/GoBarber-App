import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IApointmentsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentRepository
    ) {}

    public async execute({ date, user_id, provider_id }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError("You cant't create an appointment on a past date");
        }

        if(user_id === provider_id) {
            throw new AppError("You cant't create an appointment with yourself");
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError("You can only create appointments between 8am and 5pm");
        }

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment is ready booked');
        }

        const appointment = await this.appointmentRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;
