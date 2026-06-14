import { Module } from '@nestjs/common';
import { ShortlistController } from './shortlist.controller';
import { ShortlistService } from './shortlist.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ShortlistController],
  providers: [ShortlistService],
})
export class ShortlistModule {}
