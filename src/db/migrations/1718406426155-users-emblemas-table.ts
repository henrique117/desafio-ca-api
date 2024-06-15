import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UsersEmblemasTable1718406426155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_emblemas',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'emblema_id',
                    type: 'int',
                },
            ],
        }));

        await queryRunner.createForeignKey('users_emblemas', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['userid'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('users_emblemas', new TableForeignKey({
            columnNames: ['emblema_id'],
            referencedColumnNames: ['emblemaid'],
            referencedTableName: 'emblemas',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_emblemas', 'FK_users_emblemas_userId');
        await queryRunner.dropForeignKey('users_emblemas', 'FK_users_emblemas_emblemaId');
        await queryRunner.query(`DROP TABLE IF EXISTS user_emblemas;`)
    }

}
