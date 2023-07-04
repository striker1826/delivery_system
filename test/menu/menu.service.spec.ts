import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MenuService } from "../../src/modules/menu/menu.service";

export class FakeMenuRepository {
    async createMenu(StoreId: number, menuInfo): Promise<void> {
        return;
    }
}

describe("MenuService", () => {
    let menuService: MenuService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MenuService],
        }).compile();

        menuService = module.get<MenuService>(MenuService);
    });

    it("should be defined", () => {
        expect(menuService).toBeDefined();
    });

    describe("createMenu()", () => {
        it("존재하지 않는 StoreId일 경우", async () => {
            const StoreId = 999;
            const menuInfo = {
                name: "마라탕",
                price: 12000,
            };
            await expect(menuService.createMenu(StoreId, menuInfo)).rejects.toThrowError(new BadRequestException("존재하지 않는 가게 입니다"));
        });

        it("menu가 성공적으로 생성되었을 경우 - 성공", async () => {
            const StoreId = 1;
            const menuInfo = {
                name: "마라탕",
                price: 12000,
            };
            const result = await menuService.createMenu(StoreId, menuInfo);
            expect(result).toBeUndefined;
        });
    });

    describe("메뉴리스트 조회", () => {
        it("존재하지 않는 가게일 경우", async () => {
            const storeId = 999;
            await expect(menuService.getMenuByStoreId(storeId)).rejects.toThrowError(new BadRequestException("존재하지 않는 가게 입니다"));
        });

        it("메뉴 리스트 조회 - 성공", async () => {
            const storeId = 1;
            const result = await menuService.getMenuByStoreId(storeId);
            expect(result).toEqual({
                id: 1,
                menu: [
                    { id: 1, name: "김치찌개", price: 8000 },
                    { id: 2, name: "된장찌개", price: 9000 },
                ],
            });
        });
    });
});
