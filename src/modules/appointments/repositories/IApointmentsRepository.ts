import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IApointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(data: IFindAllInMonthProviderDTO): Promise<Appointment[]>;
}
