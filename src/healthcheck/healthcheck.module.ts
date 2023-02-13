import { Module } from '@nestjs/common';
import { HealthcheckResolver } from './healthcheck.resolver';

@Module({
  providers: [HealthcheckResolver],
})
export class HealthcheckModule {}
