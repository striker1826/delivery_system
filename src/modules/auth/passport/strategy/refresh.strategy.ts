import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh-token") {
    constructor() {
        super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken, secretOrKey: process.env.JWT_REFRESH_SECRET });
    }

    async validate(request: Request, payload: any) {
        return payload;
    }
}
