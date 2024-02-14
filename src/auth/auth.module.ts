import { Module } from '@nestjs/common';
import { JwtAuthService } from './auth.service';
import { JwtAuthGuard } from './auth.gaurd';

@Module({
    providers: [
      JwtAuthService, // Include JwtAuthService in the providers array
      JwtAuthGuard,
    ],
    exports: [JwtAuthService], // Export JwtAuthService if needed by other modules
})
export class JwtAuthModule {}
