import { IsNotEmpty, IsString } from 'class-validator';

export class RoomsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
