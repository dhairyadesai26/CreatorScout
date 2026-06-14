import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CreatorsModule } from './creators/creators.module';
import { ShortlistModule } from './shortlist/shortlist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, CreatorsModule, ShortlistModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
