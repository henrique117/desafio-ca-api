import { MigrationInterface, QueryRunner } from "typeorm";

export class EmblemasTable1718224723754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE emblemas (
                emblemaid int NOT NULL UNIQUE,
                slug varchar(255) NOT NULL,
                name varchar(255) NOT NULL,
                image varchar(255) NOT NULL,
                PRIMARY KEY (emblemaid)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS emblemas;`)
    }

}
