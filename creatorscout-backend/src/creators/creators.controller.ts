import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { QueryCreatorsDto } from './dto/query-creators.dto';

@Controller('creators')
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()
  findAll(@Query() query: QueryCreatorsDto) {
    return this.creatorsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.creatorsService.findOne(id);
  }
}
