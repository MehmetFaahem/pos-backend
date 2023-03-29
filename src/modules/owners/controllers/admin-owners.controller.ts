import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { OwnersService } from '../owners.service';

@ApiTags('Owner')
@ApiResponse({
  status: 201,
  description: 'Owner has been successfully created.',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
@Controller('admin/owners')
export class AdminOwnerController {
  constructor(private readonly ownerService: OwnersService) {}

  @ApiOperation({ summary: 'Create a Owner' })
  @Post('/')
  @ApiBody({
    type: CreateOwnerDto,
  })
  async create(@Body() body: CreateOwnerDto) {
    const Owner = await this.ownerService.create(body);
    return {
      message: 'The Owner created successfully.',
      data: Owner,
    };
  }

  @ApiOperation({ summary: 'Get All Owner' })
  @Get('/')
  async findAll() {
    const Owner = await this.ownerService.findAllByAdmin();
    return {
      message: 'Our Owner list get successfully',
      data: Owner,
    };
  }

  @ApiOperation({ summary: 'Get A Owner' })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const Owner = await this.ownerService.findOneByAdmin(id);
    return {
      message: 'Owner details get successfully',
      data: Owner,
    };
  }

  @ApiOperation({ summary: 'Update A Owner' })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateOwnerDto) {
    const Owner = await this.ownerService.updateByAdmin(id, updateDto);
    return {
      message: 'Owner updated successfully',
      data: Owner,
    };
  }

  @ApiOperation({ summary: 'Delete A Owner' })
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    const Owner = await this.ownerService.remove(id);
    return {
      message: 'Owner deleted successfully',
      data: Owner,
    };
  }
}
