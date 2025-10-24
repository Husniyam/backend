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
import { XodimService } from './xodim.service';

@Controller('xodim')
@UseGuards(JwtAuthGuard, RolesGuard)
export class XodimController {
  constructor(private readonly service: XodimService) {}

  @Get()
  @Roles('ADMIN', 'MASTER')
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @Roles('ADMIN')
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
