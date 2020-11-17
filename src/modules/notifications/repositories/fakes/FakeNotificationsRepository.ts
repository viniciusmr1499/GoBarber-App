import { ObjectID } from 'mongodb';

import INotificationsRepository from '../INotificationsRepository';
import ICreateAppointmentDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository implements INotificationsRepository{
    private notifications: Notification[] = [];

    public async create({ content, recipient_id }: ICreateAppointmentDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, { id: new ObjectID(), recipient_id, content });

        this.notifications.push(notification);

        return notification;
    }
}
