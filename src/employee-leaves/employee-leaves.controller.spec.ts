import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLeavesController } from './employee-leaves.controller';

describe('EmployeeLeavesController', () => {
  let controller: EmployeeLeavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeLeavesController],
    }).compile();

    controller = module.get<EmployeeLeavesController>(EmployeeLeavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
