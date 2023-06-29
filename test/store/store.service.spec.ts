import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '../../src/modules/store/store.service';

export class FakeOwnerRepository {}

describe('StoreService', () => {
  let storeService: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService],
    }).compile();

    storeService = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(storeService).toBeDefined();
  });

  describe('createStore()', () => {
    it('존재하지 않는 Owner일 경우 - 실패', async () => {
      const ownerId = 1;
      const store = {
        name: '가게이름',
        minimunPrice: 13000,
        deliveryTip: 2000,
      };
    });
  });
});
