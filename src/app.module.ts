import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronModule } from './cron/cron.module';
import { Files } from './files/files.entity';
import * as ormconfig from './ormconfig';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: async () => ormconfig }),
    TypeOrmModule.forFeature([Files]),
    ScheduleModule.forRoot(),
    CronModule,
    ProductsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
