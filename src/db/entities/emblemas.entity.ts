import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'emblemas' })
export class EmblemasEntity {
    @PrimaryGeneratedColumn({ name: 'emblemasid' })
    id: number
    @Column({ type: 'varchar' })
    slug: string
    @Column({ type: 'varchar' })
    name: string
    @Column({ type: 'varchar' })
    image: string
}