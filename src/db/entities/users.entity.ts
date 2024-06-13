import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn({ name: 'userid' })
    id: number
    @Column({ type: 'varchar' })
    username: string
    @Column({ type: 'varchar' })
    email: string
    @Column({ type: 'varchar' })
    password: string
    @Column({ type: 'varchar' })
    pfp: string
}