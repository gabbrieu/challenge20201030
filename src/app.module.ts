import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from './ormconfig';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: async () => ormconfig }),
    ProductsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
