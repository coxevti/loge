import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompanies1591645448586
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cnpjCpf',
            type: 'varchar',
            length: '14',
            isUnique: true,
          },
          {
            name: 'companyName',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'fantasyName',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
            isUnique: true,
          },
          {
            name: 'phone1',
            type: 'varchar',
            length: '14',
            isNullable: true,
          },
          {
            name: 'phone2',
            type: 'varchar',
            length: '14',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'state',
            type: 'char',
            length: '2',
          },
          {
            name: 'zip',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'companyLogo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
