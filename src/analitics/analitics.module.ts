import { Module } from '@nestjs/common';
import { AnaliticsService } from './analitics.service';

@Module({
  providers: [AnaliticsService]
})
export class AnaliticsModule {}
