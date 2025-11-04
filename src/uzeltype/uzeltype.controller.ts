import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Uzeltype } from './schema/uzeltype.schema';
import { UzeltypeService } from './uzeltype.service';

@Controller('uzeltype')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UzeltypeController {
  constructor(private readonly service: UzeltypeService) {}

  @Get()
  @Roles('ADMIN', 'MASTER')
  findAll() {
    return this.service.findAll();
  }

  @Get('with')
  @Roles('ADMIN', 'MASTER')
  findAllwith() {
    return this.service.findAllwith();
  }

  @Get(':id')
  @Roles('ADMIN', 'MASTER')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('MASTER')
  create(@Body() data: Uzeltype) {
    return this.service.create(data);
  }

  @Patch(':id')
  @Roles('MASTER')
  update(@Param('id') id: string, @Body() data: Uzeltype) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('MASTER')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
