import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  providers: [],
  controllers: [HealthController],
  imports: [TerminusModule],
  exports: [],
})
export class HealthModule {}
