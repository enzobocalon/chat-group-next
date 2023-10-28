import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { MessageDto } from './dto/MessageDto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  listByRoom(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) roomId: string,
  ) {
    return this.messagesService.listMessagesByRoom(userId, roomId);
  }

  @Post('create/:id')
  create(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) roomId: string,
    @Body() data: MessageDto,
  ) {
    return this.messagesService.create(userId, roomId, data);
  }

  @Delete('/delete/:id')
  delete(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) messageId: string,
  ) {
    return this.messagesService.delete(userId, messageId);
  }
}
