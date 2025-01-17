import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { NotificationSchema } from './schemas/notification.schemas';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  // imports: [
  //   MongooseModule.forFeature([
  //     { name: Notification.name, schema: NotificationSchema },
  //   ]),
  //   ClientsModule.register([
  //     {
  //       name: 'NOTIFICATION_SERVICE',
  //       transport: Transport.RMQ,
  //       options: {
  //         urls: ['http://localhost:15672'],
  //         queue: 'NotificationEvent',
  //         queueOptions: {
  //           durable: false,
  //         },
  //       },
  //     },
  //   ]),
  // ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
