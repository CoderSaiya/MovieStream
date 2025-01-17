import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(@Body() data: CreateNotificationDto) {
    return this.notificationService.handleNotificationEvent(data);
  }
}
