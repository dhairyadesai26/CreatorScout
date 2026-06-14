import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ShortlistService } from './shortlist.service';
import { AddToShortlistDto } from './dto/add-to-shortlist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('shortlist')
@UseGuards(JwtAuthGuard)
export class ShortlistController {
  constructor(private readonly shortlistService: ShortlistService) {}

  @Get()
  getShortlist(@Request() req: RequestWithUser) {
    return this.shortlistService.getShortlist(req.user.userId);
  }

  @Post()
  addToShortlist(@Request() req: RequestWithUser, @Body() dto: AddToShortlistDto) {
    return this.shortlistService.addToShortlist(req.user.userId, dto);
  }

  @Delete(':creatorId')
  removeFromShortlist(
    @Request() req: RequestWithUser,
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
  ) {
    return this.shortlistService.removeFromShortlist(
      req.user.userId,
      creatorId,
    );
  }
}
