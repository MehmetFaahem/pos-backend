import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Owner, OwnerDocument } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner.name)
    private ownerModel: Model<OwnerDocument>,
  ) {}

  public async create(createDto: CreateOwnerDto) {
    const newowner = await this.ownerModel.create({
      ...createDto,
    });
    await newowner.save();
    return newowner;
  }

  async findAllByPublic() {
    const services = await this.ownerModel
      .find({})
      .sort({
        created_at: 1,
      })
      .select(['name', 'email', 'phone', 'location']);
    return services;
  }

  async findAllByAdmin() {
    const services = await this.ownerModel
      .find({})
      .sort({
        created_at: -1,
      })
      .select(['name', 'email', 'phone', 'location']);
    return services;
  }

  async findOneByAdmin(id: string) {
    const services = await this.ownerModel
      .findOne({ _id: id })
      .select(['name', 'email', 'phone', 'location']);
    if (!services) throw new BadRequestException('Invalid schedule call id.');
    return services;
  }

  async findOneByPublic(id: string) {
    const services = await this.ownerModel
      .findOne({ _id: id })
      .select(['name', 'email', 'phone', 'location']);
    if (!services) throw new BadRequestException('Invalid schedule call id.');
    return services;
  }

  async updateByAdmin(
    id: string,
    updateDto: UpdateOwnerDto,
  ): Promise<OwnerDocument> {
    const exists = await this.ownerModel
      .findOne({
        _id: id,
      })
      .select(['name', 'email', 'phone', 'location']);
    if (!exists) throw new BadRequestException('Invalid owner id.');

    Object.keys(updateDto).forEach((key) => {
      exists[key] = updateDto[key];
    });
    await exists.save();
    return exists;
  }

  async remove(id: number) {
    const exists = await this.ownerModel
      .findOneAndRemove({
        _id: id,
      })
      .select(['_id']);

    if (!exists)
      throw new BadRequestException(
        'Invalid owner id or document maybe deleted.',
      );

    // await exists.remove();
    return exists;
  }
}
