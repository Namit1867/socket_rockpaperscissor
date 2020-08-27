import { Test, TestingModule } from '@nestjs/testing';
import { AppgatewayGateway } from './appgateway.gateway';

describe('AppgatewayGateway', () => {
  let gateway: AppgatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppgatewayGateway],
    }).compile();

    gateway = module.get<AppgatewayGateway>(AppgatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
