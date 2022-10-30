import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    return {
      lastTimeExecutedCron: files[0].createdAt,
      upTime: `Time online: ${this.formatTime(process.uptime())}s`,
      memoryUsage: process.memoryUsage(),
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
