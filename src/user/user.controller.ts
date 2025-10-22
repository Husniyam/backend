// src/user/user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Faqat ADMIN yangi user qo‘sha oladi
  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(
    @Body() body: { jshshir: string; password: string; role?: string },
  ) {
    return this.userService.create(body);
  }

  // ✅ Faqat ADMIN userni yangilay oladi
  @Patch(':id')
  @Roles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() body: { jshshir?: string; password?: string; role?: string },
  ) {
    return this.userService.update(id, body);
  }

  // ✅ Faqat ADMIN userni o‘chira oladi
  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
