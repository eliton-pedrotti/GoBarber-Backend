import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import iCreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';


class AppointmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

        return findAppointment;
    }

    public async create({ date, provider_id }: iCreateAppointmentDTO): Promise<Appointment> {

        const appointment = new Appointment();

        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;

        this.appointments.push(appointment)

        return appointment;
    }
}


export default AppointmentsRepository;