import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Files {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    default: () => 'LOCALTIMESTAMP',
  })
  updatedAt: string;
}
