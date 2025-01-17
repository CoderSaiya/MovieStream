import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://movieflix:notificationservice@notificationdb.ztnjk.mongodb.net/?retryWrites=true&w=majority&appName=notificationDb',
    ),
    NotificationModule,
  ],
})
export class AppModule {}
