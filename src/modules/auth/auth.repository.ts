import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { IAuthRepository } from "./auth.IRepository";
import { UserOutputDto } from "./dto/output/user.output.dto";
import { Owner } from "../../entities/owner.entity";
import { OwnerOutputDto } from "./dto/output/owner.output.dto";

export class AuthRepository implements IAuthRepository {
    constructor(@InjectRepository(User) private userModel: Repository<User>, @InjectRepository(Owner) private ownerModel: Repository<Owner>) {}

    async findUserByUserId(UserId: string): Promise<UserOutputDto> {
        const result = await this.userModel.createQueryBuilder("user").where("user.userId = :UserId", { UserId }).getOne();

        return plainToInstance(UserOutputDto, result);
    }

    async createUser(userId: string, password: string): Promise<void> {
        const newUser = this.userModel.create();
        newUser.userId = userId;
        newUser.password = password;
        await this.userModel.save(newUser);
        return;
    }

    async createOwner(ownerId: string, hashedPassword: string): Promise<void> {
        const newOwner = this.ownerModel.create();
        newOwner.ownerId = ownerId;
        newOwner.password = hashedPassword;
        await this.ownerModel.save(newOwner);
        return;
    }

    async findOwnerByOwnerId(ownerId: string): Promise<OwnerOutputDto> {
        const result = await this.ownerModel.createQueryBuilder("owner").where("owner.ownerId = :ownerId", { ownerId });
        return plainToInstance(OwnerOutputDto, result);
    }
}
