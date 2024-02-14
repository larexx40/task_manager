import { Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "src/user/user.interface";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthService {
    // constructor(private readonly jwtService: JwtService) {};
    async generateToken (payload:AuthTokenPayload,) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    }

    async verifyToken(token: string): Promise<AuthTokenPayload> {
        const payload = jwt.verify(token,  process.env.JWT_SECRET_KEY ) as AuthTokenPayload;
        return payload;
    }
}