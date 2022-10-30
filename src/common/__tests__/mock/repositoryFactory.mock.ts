import { Repository } from 'typeorm';
import { MockType } from './mockType';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const repositoryFactoryMock: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneOrFail: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    count: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    findAndCount: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    preload: jest.fn((entity) => entity),
    createQueryBuilder: jest.fn((entity) => entity),
    innerJoin: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    query: jest.fn((entity) => entity),
  }),
);
