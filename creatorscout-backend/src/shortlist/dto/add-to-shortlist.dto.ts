import { IsUUID } from 'class-validator';

export class AddToShortlistDto {
  @IsUUID('4', { message: 'creatorId must be a valid UUID' })
  creatorId: string;
}
