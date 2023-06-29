import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { User } from "../src/entities/user.entity";
import { AuthModule } from "../src/modules/auth/auth.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                ConfigModule.forRoot(),
                TypeOrmModule.forRoot({
                    type: "mysql",
                    host: process.env.DB_HOST,
                    port: 3306,
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: "mock_deliverySystem",
                    entities: [User],
                    synchronize: true,
                    // logging: true,
                    dropSchema: true,
                }),
            ],
            providers: [],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("/auth", () => {
        it("/auth/signup (POST) - 회원가입 성공", async () => {
            const result = await request(app.getHttpServer()).post("/auth/signup").send({ userId: "kim", password: "1234" });
            expect(result.body).toBeNull;
            expect(result.status).toEqual(201);
        });

        it("/auth/signup (POST) - 실패 (아이디가 이미 존재할 경우)", async () => {
            const result = await request(app.getHttpServer()).post("/auth/signup").send({ userId: "kim", password: "1234" });

            const resultInfo = JSON.parse(result.text);
            expect(resultInfo.message).toEqual("이미 존재하는 아이디 입니다");
            expect(resultInfo.statusCode).toEqual(400);
        });

        it("login (POST) - 로그인 성공", async () => {
            const result = await request(app.getHttpServer()).post("/auth/login").send({ userId: "kim", password: "1234" });

            expect(result.statusCode).toEqual(201);
            expect(result.body).toHaveProperty("access_token");
            expect(result.body).toHaveProperty("refresh_token");
        });

        it("login (POST) - 로그인 실패 (존재하지 않는 아이디일 경우", async () => {
            const result = await request(app.getHttpServer()).post("/auth/login").send({ userId: "kim999", password: "1234" });

            const resultInfo = JSON.parse(result.text);
            expect(resultInfo.message).toEqual("아이디 혹은 비밀번호를 다시 확인해 주세요");
            expect(resultInfo.statusCode).toEqual(400);
        });

        it("login (POST) - 로그인 실패 (비밀번호가 일치하지 않을 경우)", async () => {
            const result = await request(app.getHttpServer()).post("/auth/login").send({ userId: "kim", password: "9999" });

            const resultInfo = JSON.parse(result.text);
            expect(resultInfo.message).toEqual("아이디 혹은 비밀번호를 다시 확인해 주세요");
            expect(resultInfo.statusCode).toEqual(400);
        });
    });
});
