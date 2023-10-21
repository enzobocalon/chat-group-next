import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SocketModule } from './shared/sockets/socket.module';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    RoomsModule,
    MessagesModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
