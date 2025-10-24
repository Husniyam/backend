// src/jurnal/jurnal.controller.ts
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
import { JurnalService } from './jurnal.service';

@Controller('jurnal')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JurnalController {
  constructor(private readonly service: JurnalService) {}

  @Get()
  @Roles('ADMIN', 'MASTER')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'MASTER')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles('MASTER')
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch(':id')
  @Roles('MASTER')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('MASTER')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
