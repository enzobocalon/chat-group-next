import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { RoomsDto } from './dto/RoomsDto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  listsUserRoom(@ActiveUserId() userId: string) {
    return this.roomsService.listRoomsByUser(userId);
  }

  @Get('filters')
  listRoomByName(@Query('name') name: string) {
    return this.roomsService.listRoomByName(name);
  }

  @Get(':id')
  listRoomById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.listRoomById(id);
  }

  @Get('/members/:id')
  listMembersByRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.listMembersByRoom(id);
  }

  @Post('create')
  createRoom(@ActiveUserId() userId: string, @Body() roomDto: RoomsDto) {
    return this.roomsService.create(userId, roomDto);
  }

  @Post('join/:id')
  joinRoom(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) roomId: string,
  ) {
    return this.roomsService.joinRoom(userId, roomId);
  }

  @Post('left/:id')
  leftRoom(
    @ActiveUserId() userId: string,
    @Param('id', ParseUUIDPipe) roomId: string,
  ) {
    return this.roomsService.leftRoom(userId, roomId);
  }
}
