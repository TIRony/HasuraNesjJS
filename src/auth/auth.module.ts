import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthEventsService } from './auth.events.service';
import { AuthResolver } from './auth.resolver';
import { DbModule } from 'src/db/db.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    DbModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthEventsService, AuthResolver],
})
export class AuthModule {}
