import Appointment from '../infra/typeorm/entities/Appointment';
import iCreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

interface IAppointmentsRepository{
    create(data: iCreateAppointmentDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
}

export default IAppointmentsRepository;