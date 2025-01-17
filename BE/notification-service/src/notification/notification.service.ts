import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas/notification.schemas';
import { Model } from 'mongoose';
import { EventPattern } from '@nestjs/microservices';
import { NotificationGateway } from './notification.gateway';
import { CreateNotificationDto } from './dto/create-notification';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private notificationGateway: NotificationGateway,
  ) {}

  async onModuleInit() {
    console.log('Notification Service is listening to RabbitMQ events...');
  }

  @EventPattern('notification_event')
  async handleNotificationEvent(payload: CreateNotificationDto) {
    console.log(`Received notification from RabbitMQ:`, payload);

    // Lưu thông báo vào MongoDB
    const notification = new this.notificationModel(payload);
    await notification.save();

    // Gửi thông báo real-time qua WebSocket (update sau)
    this.notificationGateway.sendNotificationMessage(notification);
  }
}
