import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 14 })
  cnpjCpf: string;

  @Column('varchar', { length: 100 })
  companyName: string;

  @Column('varchar', { length: 100 })
  fantasyName: string;

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
  companyLogo: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Company;
