import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminOwnerController } from './controllers/admin-owners.controller';
import { Owner, OwnersSchema } from './entities/owner.entity';
import { OwnersService } from './owners.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnersSchema }]),
  ],
  controllers: [AdminOwnerController],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
