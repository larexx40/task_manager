import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenPayload } from "src/user/user.interface";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {};
    async generateToken (payload:AuthTokenPayload) {
        return this.jwtService.sign(payload)
    }

    async verifyToken(token: string): Promise<AuthTokenPayload> {
        return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    }
}