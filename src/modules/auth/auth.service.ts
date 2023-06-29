import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { IAuthRepository } from "./auth.IRepository";
import { SignupInputDto } from "./dto/input/signup.input.dto";
import { JwtOutputDto } from "./dto/output/jwt.output.dto";
import { AccessTokenOutputDto } from "./dto/output/access-token.output.dto";
import { RefreshTokenOutputDto } from "./dto/output/refresh-token.output.dto";
import { plainToInstance } from "class-transformer";
import { CreateOwnerInputDto } from "./dto/input/create-owner.dto";

@Injectable()
export class AuthService {
    constructor(@Inject(IAuthRepository) private authRepository: IAuthRepository, private jwtService: JwtService) {}

    async signUp(body: SignupInputDto) {
        const { userId, password } = body;

        const user = await this.authRepository.findUserByUserId(userId);
        if (user) {
            throw new BadRequestException("이미 존재하는 아이디 입니다");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.authRepository.createUser(userId, hashedPassword);
        return;
    }

    async createOwner(body: CreateOwnerInputDto) {
        const { ownerId, password } = body;

        const owner = await this.authRepository.findOwnerByOwnerId(ownerId);
        if (owner) {
            throw new BadRequestException("이미 존재하는 아이디 입니다");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.authRepository.createOwner(ownerId, hashedPassword);
        return;
    }

    async login(body: SignupInputDto): Promise<JwtOutputDto> {
        const { userId, password } = body;
        const user = await this.authRepository.findUserByUserId(userId);
        if (!user) {
            throw new BadRequestException("아이디 혹은 비밀번호를 다시 확인해 주세요");
        }
        const checkPassword = await bcrypt.compare(password, user._password);
        if (!checkPassword) {
            throw new BadRequestException("아이디 혹은 비밀번호를 다시 확인해 주세요");
        }
        const access_token = this.generateJwt(user._id, "access_token");
        const refresh_token = this.generateJwt(user._id, "refresh_token");
        return plainToInstance(JwtOutputDto, { access_token, refresh_token });
    }

    async loginOwner(body: CreateOwnerInputDto): Promise<JwtOutputDto> {
        const { ownerId, password } = body;
        const owner = await this.authRepository.findOwnerByOwnerId(ownerId);
        if (!owner) {
            throw new BadRequestException("아이디 혹은 비밀번호를 다시 확인해 주세요");
        }
        const checkPassword = await bcrypt.compare(password, owner._password);
        if (!checkPassword) {
            throw new BadRequestException("아이디 혹은 비밀번호를 다시 확인해 주세요");
        }
        const access_token = this.generateJwt(owner._id, "access_token");
        const refresh_token = this.generateJwt(owner._id, "refresh_token");
        return plainToInstance(JwtOutputDto, { access_token, refresh_token });
    }

    generateJwt(UserId: number, key: string): AccessTokenOutputDto | RefreshTokenOutputDto {
        let jwtSecret: string;
        let jwtExpire: string;
        if (key === "access_token") {
            console.log(process.env.JWT_ACCESS_SECRET);
            jwtSecret = process.env.JWT_ACCESS_SECRET;
            jwtExpire = process.env.JWT_ACCESS_TIME;
            const access_token = this.jwtService.sign({ UserId }, { secret: jwtSecret, expiresIn: jwtExpire });
            return plainToInstance(AccessTokenOutputDto, access_token);
        }
        if (key === "refresh_token") {
            jwtSecret = process.env.JWT_REFRESH_SECRET;
            jwtExpire = process.env.JWT_REFRESH_TIME;
            const refresh_token = this.jwtService.sign({ UserId }, { secret: jwtSecret, expiresIn: jwtExpire });
            return plainToInstance(RefreshTokenOutputDto, refresh_token);
        }
    }
}
