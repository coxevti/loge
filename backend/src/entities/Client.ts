import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 14 })
  cnpjCpf: string;

  @Column('varchar', { length: 150 })
  name: string;

  @Column('varchar', { length: 150 })
  email: string;

  @Column('varchar', { length: 14 })
  phone1: string;

  @Column('varchar', { length: 14 })
  phone2: string;

  @Column()
  address: string;

  @Column('varchar', { length: 50 })
  neighborhood: string;

  @Column('varchar', { length: 50 })
  city: string;

  @Column('char', { length: 2 })
  state: string;

  @Column('varchar', { length: 10 })
  zip: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Client;
