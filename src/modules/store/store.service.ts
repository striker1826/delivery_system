import { BadRequestException, Injectable } from "@nestjs/common";
import { FakeOwnerRepository, FakeStoreRepository } from "../../../test/store/store.service.spec";

@Injectable()
export class StoreService {
    storeRepository = new FakeStoreRepository();
    ownerRepository = new FakeOwnerRepository();

    async createStore(OwnerId: number, storeInfo): Promise<void> {
        const owner = await this.ownerRepository.findOwnerById(OwnerId);
        if (!owner) {
            throw new BadRequestException("존재하지 않는 사장님 입니다");
        }
        await this.storeRepository.createStore(OwnerId, storeInfo);
        return;
    }
}
