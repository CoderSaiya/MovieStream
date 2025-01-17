import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateNotificationDto } from './dto/create-notification';

@WebSocketGateway(3001)
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // xóa client
    for (const [userId, socket] of this.clients.entries()) {
      if (socket.id === client.id) {
        this.clients.delete(userId);
        break;
      }
    }
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: { userId: string }, client: Socket) {
    console.log(`Registering userId: ${data.userId} for socket: ${client.id}`);
    this.clients.set(data.userId, client);
  }

  sendNotificationMessage(data: CreateNotificationDto) {
    const client = this.clients.get(data.userId);
    if (client) {
      client.emit('NotificationEvent', { MessageBody: data.message });
      console.log(`Sent notification to userId: ${data.userId}`);
    } else {
      console.log(`UserId: ${data.userId} is not connected.`);
    }
  }
}
