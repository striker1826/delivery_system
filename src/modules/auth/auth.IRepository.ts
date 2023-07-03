import { OwnerOutputDto } from "./dto/output/owner.output.dto";
import { UserOutputDto } from "./dto/output/user.output.dto";

export interface IAuthRepository {
    findUserByUserId(UserId: string): Promise<UserOutputDto>;
    createUser(id: string, password: string): Promise<void>;
    findOwnerByOwnerId(ownerId: string): Promise<OwnerOutputDto>;
    createOwner(ownerId: string, hashedPassword: string);
}

export const IAuthRepository = Symbol("IAuthRepository");
