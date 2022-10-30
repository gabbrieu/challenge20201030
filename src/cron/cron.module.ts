import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from '../files/files.entity';
import { Products } from '../products/products.entity';
import { CronService } from './cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files, Products]), HttpModule],
  providers: [CronService],
})
export class CronModule {}
