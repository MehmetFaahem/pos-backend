import { Test, TestingModule } from '@nestjs/testing';
import { AdminOwnerController } from './controllers/admin-owners.controller';
import { OwnersService } from './owners.service';

describe('OwnersController', () => {
  let controller: AdminOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOwnerController],
      providers: [OwnersService],
    }).compile();

    controller = module.get<AdminOwnerController>(AdminOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
