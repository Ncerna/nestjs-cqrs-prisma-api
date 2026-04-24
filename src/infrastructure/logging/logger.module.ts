import { Module } from '@nestjs/common';
import { AppLogger } from '../services/logger.service';

@Module({
  providers: [
    {
      provide: 'LOGGER',
      useClass: AppLogger,
    },
  ],
  exports: ['LOGGER'],
})
export class LoggerModule {}