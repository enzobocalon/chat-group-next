import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(0, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, roomId: string) {
    console.log('chamou joinRoom');
    client.join(roomId);
    client.emit('joinedRoom', roomId);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    client.emit('leftRoom', roomId);
  }
}
