import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1718224574462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                userid int NOT NULL UNIQUE AUTO_INCREMENT,
                username varchar(30) NOT NULL UNIQUE,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                pfp varchar(255) NULL,
                PRIMARY KEY (userid)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users;`)
    }

}
