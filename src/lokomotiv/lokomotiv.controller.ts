// src/lokomotiv/lokomotiv.controller.ts
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
import { LokomotivService } from './lokomotiv.service';

@Controller('lokomotiv')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LokomotivController {
  constructor(private readonly service: LokomotivService) {}

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Post()
  @Roles('ADMIN')
  async create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch(':id')
  @Roles('ADMIN')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
