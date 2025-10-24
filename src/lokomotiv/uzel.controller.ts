// src/lokomotiv/uzel.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { uzelDto } from './dto/uzel.dto';
import { UzelService } from './uzel.service';

@Controller('uzel')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UzelController {
  constructor(private readonly service: UzelService) {}

  @Get()
  @Roles('ADMIN', 'MASTER')
  findAll() {
    return this.service.findAll();
  }

  @Get('by')
  @Roles('ADMIN', 'MASTER')
  findAllBy() {
    return this.service.findAllBy();
  }

  // ✅ Barcha uzellar (lokomotiv bo‘yicha filtr bilan)
  @Get()
  @Roles('MASTER', 'ADMIN')
  async getAll(@Query('lokomotivId') lokomotivId?: string) {
    return this.service.findAllbyloko(lokomotivId);
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
  update(@Param('id') id: string, @Body() data: uzelDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('MASTER')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
