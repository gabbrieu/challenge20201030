import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ungzip } from 'node-gzip';
import * as readline from 'readline';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Files } from '../files/files.entity';
import { Products, StatusEnum } from '../products/products.entity';
dotenv.config();

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectRepository(Files)
    private readonly fileRepository: Repository<Files>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    const fileName = await this.getNextFileName();
    const chunks = [];
    const readStream = await (await this.downloadFile(fileName)).data;
    const productJsonFileName = fileName.split('.gz')[0];

    const streamPromise = new Promise((res, rej) => {
      readStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      readStream.on('end', async () => {
        const dataBuffered = Buffer.concat(chunks);
        const fileUnzipped = await ungzip(dataBuffered);

        fs.writeFile(
          `unzippedFiles/${productJsonFileName}`,
          fileUnzipped,
          (err) => {
            if (err) this.logger.log(err);
            else {
              res(dataBuffered);
              this.logger.log('File written successfully');
            }
          },
        );
      });

      readStream.on('error', (err) => {
        this.logger.error('error: ', err);
        rej(err);
      });
    });
    await streamPromise;

    await this.saveFileOnDatabase(productJsonFileName);
  }

  async getNextFileName(): Promise<string> {
    const files = await this.fileRepository.find({
      order: { createdAt: 'DESC' },
    });
    if (files.length === 0) return 'products_01.json.gz';

    const fileNumber: number = +files[0].fileName.split('.')[0].split('_')[1];
    if (fileNumber === 9) throw new Error('Last file already on database');

    return `products_0${fileNumber + 1}.json.gz`;
  }

  async downloadFile(fileName: string) {
    const url = process.env.BASE_FILE_URL;
    try {
      const response = this.httpService.get(`${url}/${fileName}`, {
        responseType: 'stream',
      });
      return lastValueFrom(response);
    } catch (error) {
      this.logger.error(`Error while getting files from server: ${error}`);
    }
  }

  async saveFileOnDatabase(fileName: string) {
    const fileStream = fs.createReadStream(
      `${__dirname}/../../unzippedFiles/${fileName}`,
    );

    const rl = readline.createInterface({
      input: fileStream,
    });
    let productsOnJsonFile = [];

    for await (const line of rl) {
      if (productsOnJsonFile.length === 100) {
        break;
      }
      productsOnJsonFile.push(JSON.parse(line));
    }

    productsOnJsonFile = productsOnJsonFile.map((product) => {
      return {
        code: isNaN(+product.code.replace(`"`, ''))
          ? 0
          : +product.code.replace(`"`, ''),
        brands: product.brands,
        categories: product.categories,
        url: product.url,
        creator: product.creator,
        created_t: isNaN(+product.created_t) ? 0 : +product.created_t,
        last_modified_t: isNaN(+product.last_modified_t)
          ? 0
          : +product.last_modified_t,
        product_name: product.product_name,
        quantity: product.quantity,
        labels: product.labels,
        cities: product.cities,
        purchase_places: product.purchase_places,
        stores: product.stores,
        ingredients_text: product.ingredients_text,
        traces: product.traces,
        serving_size: product.serving_size,
        serving_quantity: isNaN(+product.serving_quantity)
          ? 0
          : +product.serving_quantity,
        nutriscore_score: isNaN(+product.nutriscore_score)
          ? 0
          : +product.nutriscore_score,
        nutriscore_grade: product.nutriscore_grade,
        main_category: product.main_category,
        image_url: product.image_url,
        status: StatusEnum.PUBLISHED,
        imported_t: new Date().toISOString(),
      } as Products;
    });

    await this.productRepository.insert(productsOnJsonFile);

    const file: Partial<Files> = {
      fileName,
    };
    await this.fileRepository.save(file);
  }
}
