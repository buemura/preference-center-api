import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ConsentSchema } from '../schemas/consent.schema';

export class DDLCreateConsentTable1728675970384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ConsentSchema.options.tableName,
        columns: [
          {
            name: 'consent_id',
            type: 'varchar',
            isPrimary: false,
          },
          {
            name: 'user_id',
            type: 'varchar',
            isPrimary: false,
          },
          {
            name: 'enabled',
            type: 'boolean',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_CONSENT_COMPOSITE_KEY',
            columnNames: ['consent_id', 'user_id'],
            isUnique: true,
          },
        ],
        uniques: [
          {
            name: 'UNQ_CONSENT_COMPOSITE_KEY',
            columnNames: ['consent_id', 'user_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ConsentSchema.options.tableName);
  }
}
