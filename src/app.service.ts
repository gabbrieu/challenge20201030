import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Files } from './files/files.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Files)
    private readonly fileRepository: Repository<Files>,
  ) {}

  async getDetails() {
    const files = await this.fileRepository.find({
      order: { createdAt: 'DESC' },
    });

    const databaseConnection = getConnection().isConnected;

    return {
      upTime: `${this.formatTime(process.uptime())}s`,
      memoryUsage: process.memoryUsage(),
      lastTimeExecutedCron: files[0].createdAt,
      isDatabaseOnline: databaseConnection,
    };
  }

  formatTime(seconds: number): string {
    function pad(s: number) {
      return (s < 10 ? '0' : '') + s;
    }
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const realSeconds = Math.floor(seconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(realSeconds);
  }
}
