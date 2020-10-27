import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/AppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('Should be able to create a new appointment', async () => {
        const createAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(createAppointmentsRepository);

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '5151515'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('5151515');
    });

    it('Should be able to create two appointments on the same time', async () => {
        const createAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(createAppointmentsRepository);

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '5151515'
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '5151515'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });
});