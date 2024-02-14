import { Module } from '@nestjs/common';
import { JwtAuthService } from './auth.service';

@Module({
    imports: [JwtAuthService],
    exports:[JwtAuthService],
})
export class JwtAuthModule {}
