import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmblemasEntity } from "./emblemas.entity";

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn({ name: 'userid' })
    userid: number
    @Column({ type: 'varchar' })
    username: string
    @Column({ type: 'varchar' })
    email: string
    @Column({ type: 'varchar' })
    password: string
    @Column({ type: 'varchar' })
    pfp: string
    @ManyToMany(() => EmblemasEntity, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_emblemas',
        joinColumn: { name: 'user_id', referencedColumnName: 'userid' },
        inverseJoinColumn: { name: 'emblema_id', referencedColumnName: 'emblemaid' }
    })
    emblemas: EmblemasEntity[];
}