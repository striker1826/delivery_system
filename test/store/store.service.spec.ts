import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { StoreService } from "../../src/modules/store/store.service";

export class FakeOwnerRepository {
    findOwnerById(OwnerId: number) {
        if (OwnerId === 1) {
            return {
                id: 1,
                name: "가게이름",
                minimunPrice: 13000,
                deliveryTip: 2000,
            };
        }
    }
}
export class FakeStoreRepository {
    async createStore(ownerId, storeInfo): Promise<void> {
        return;
    }

    async findStoreById(StoreId: number) {
        if (StoreId === 1) {
            return {
                id: 1,
            };
        }
    }
}

describe("StoreService", () => {
    let storeService: StoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreService],
        }).compile();

        storeService = module.get<StoreService>(StoreService);
    });

    it("should be defined", () => {
        expect(storeService).toBeDefined();
    });

    describe("createStore()", () => {
        it("존재하지 않는 Owner일 경우 - 실패", async () => {
            const OwnerId = 999;
            const storeInfo = {
                name: "가게이름",
                minimunPrice: 13000,
                deliveryTip: 2000,
            };
            await expect(storeService.createStore(OwnerId, storeInfo)).rejects.toThrowError(new BadRequestException("존재하지 않는 사장님 입니다"));
        });

        it("정상적으로 store가 생성되었을 경우 리턴 값이 null 이어야 한다 - 성공", async () => {
            const OwnerId = 1;
            const storeInfo = {
                name: "가게이름",
                minimunPrice: 13000,
                deliveryTip: 2000,
            };

            const result = await storeService.createStore(OwnerId, storeInfo);
            expect(result).toBeUndefined;
        });
    });
});
