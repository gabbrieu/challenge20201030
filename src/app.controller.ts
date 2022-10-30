import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller('/')
@ApiTags('Base Controller')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Get program basic details' })
  async getDetails() {
    return await this.service.getDetails();
  }
}
