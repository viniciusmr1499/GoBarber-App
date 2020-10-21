import Apointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IApointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Apointment>;
    findByDate(date: Date): Promise<Apointment | undefined>;
}
