import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { IAuthRepository } from "./auth.IRepository";
import { AuthRepository } from "./auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Owner } from "../../entities/owner.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Owner]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: { expiresIn: process.env.JWT_ACCESS_TIME },
        }),
    ],
    controllers: [AuthController],
    providers: [JwtService, AuthService, { provide: IAuthRepository, useClass: AuthRepository }],
    exports: [IAuthRepository],
})
export class AuthModule {}
