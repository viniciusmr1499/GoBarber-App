import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request: Request, response: Response) => {
    const appointmentsRepository = getRepository(Appointment);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

        return response.json(appointment);
    }catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
