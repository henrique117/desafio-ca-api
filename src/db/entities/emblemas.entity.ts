import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity({ name: 'emblemas' })
export class EmblemasEntity {
    @PrimaryGeneratedColumn({ name: 'emblemaid' })
    emblemaid: number
    @Column({ type: 'varchar' })
    slug: string
    @Column({ type: 'varchar' })
    name: string
    @Column({ type: 'varchar' })
    image: string
    @ManyToMany(() => UsersEntity, user => user.emblemas)
    @JoinTable({
        name: 'users_emblemas',
        joinColumn: { name: 'emblema_id', referencedColumnName: 'emblemaid' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'userid' }
    })
    users: UsersEntity[];
}