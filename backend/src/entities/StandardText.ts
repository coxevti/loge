import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StandardTextType {
  budget = 'budget',
}

@Entity('standard_texts')
class StandardText {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: StandardTextType })
  type: StandardTextType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default StandardText;
