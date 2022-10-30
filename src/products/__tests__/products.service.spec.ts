import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../../common/__tests__/mock/mockType';
import { repositoryFactoryMock } from '../../common/__tests__/mock/repositoryFactory.mock';
import { Products, StatusEnum } from '../products.entity';
import { ProductsService } from '../products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: MockType<Repository<Products>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Products),
          useFactory: repositoryFactoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(getRepositoryToken(Products));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get all products', () => {
    it('should get all products', async () => {
      repository.find.mockReturnValue([{ code: 1, brands: '' }]);
      const response = await service.getAll({ take: 50, skip: 0 });
      expect(response).toStrictEqual([{ code: 1, brands: '' }]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get one product', () => {
    it('should get one product', async () => {
      repository.findOne.mockReturnValue({ code: 1, brands: '' });
      const response = await service.getOne('1');
      expect(response).toStrictEqual({ code: 1, brands: '' });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NOT_FOUND error when a product is not found', async () => {
      repository.findOne.mockReturnValue(undefined);
      service.getOne('1').catch((e) => {
        expect(e.message).toEqual('Product not found');
        expect(e.status).toEqual(HttpStatus.NOT_FOUND);
      });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete one product', () => {
    it('should change product status to trash', async () => {
      repository.findOne.mockReturnValue({
        code: 1,
        status: StatusEnum.PUBLISHED,
      });
      repository.save.mockReturnValue({ code: 1, status: StatusEnum.TRASH });
      await expect(service.delete('1')).resolves.not.toThrow();
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw NOT_FOUND error when a product is not found', async () => {
      repository.findOne.mockReturnValue(undefined);
      service.delete('1').catch((e) => {
        expect(e.message).toEqual('Product not found');
        expect(e.status).toEqual(HttpStatus.NOT_FOUND);
      });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update one product', () => {
    it('should update the product', async () => {
      repository.findOne.mockReturnValue({
        code: 1,
        status: StatusEnum.PUBLISHED,
      });
      repository.save.mockReturnValue({ code: 1, status: StatusEnum.TRASH });

      const response = await service.update('1', {
        status: StatusEnum.DRAFT,
      } as any);

      expect(response).toStrictEqual({
        code: 1,
        status: StatusEnum.DRAFT,
      });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NOT_FOUND error when a product is not found', async () => {
      repository.findOne.mockReturnValue(undefined);
      service
        .update('1', {
          status: StatusEnum.DRAFT,
        } as any)
        .catch((e) => {
          expect(e.message).toEqual('Product not found');
          expect(e.status).toEqual(HttpStatus.NOT_FOUND);
        });
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
