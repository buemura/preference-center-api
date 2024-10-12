import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { ConsentEventSchema } from '../schemas/consent-event.schema';

export class DDLCreateConsentEventTable1728676194784
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ConsentEventSchema.options.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'consent_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'enabled',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      ConsentEventSchema.options.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      ConsentEventSchema.options.tableName,
      new TableForeignKey({
        columnNames: ['user_id', 'consent_id'],
        referencedColumnNames: ['user_id', 'consent_id'],
        referencedTableName: 'consents',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(
      ConsentEventSchema.options.tableName,
    );
    const foreignKeyUser = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    const foreignKeyConsent = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('consent_id') !== -1,
    );

    if (foreignKeyUser) {
      await queryRunner.dropForeignKey(
        ConsentEventSchema.options.tableName,
        foreignKeyUser,
      );
    }

    if (foreignKeyConsent) {
      await queryRunner.dropForeignKey(
        ConsentEventSchema.options.tableName,
        foreignKeyConsent,
      );
    }

    await queryRunner.dropTable(ConsentEventSchema.options.tableName);
  }
}
